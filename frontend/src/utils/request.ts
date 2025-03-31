import { API_CONFIG } from '../config/api';

interface RequestOptions extends RequestInit {
  timeout?: number;
  retryCount?: number;
  retryDelay?: number;
}

interface ApiError extends Error {
  status?: number;
  data?: any;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithTimeout(url: string, options: RequestOptions = {}): Promise<Response> {
  const { timeout = API_CONFIG.TIMEOUT } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

async function request<T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    retryCount = API_CONFIG.RETRY_COUNT,
    retryDelay = API_CONFIG.RETRY_DELAY,
    ...fetchOptions
  } = options;

  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  // 合并默认 headers
  const headers = new Headers(fetchOptions.headers);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  let lastError: ApiError = new Error('Request failed') as ApiError;
  for (let attempt = 0; attempt <= retryCount; attempt++) {
    try {
      const response = await fetchWithTimeout(url, {
        ...fetchOptions,
        headers,
      });

      if (!response.ok) {
        const error = new Error('Request failed') as ApiError;
        error.status = response.status;
        try {
          error.data = await response.json();
        } catch {
          error.data = await response.text();
        }
        throw error;
      }

      return await response.json();
    } catch (error: any) {
      lastError = error;
      
      // 不重试的情况
      if (
        error.name === 'AbortError' || // 超时
        attempt === retryCount || // 达到重试次数
        error.status === 401 || // 未授权
        error.status === 403 || // 禁止访问
        error.status === 404 || // 资源不存在
        error.status === 422 // 参数验证失败
      ) {
        break;
      }

      // 等待后重试
      await sleep(retryDelay * (attempt + 1));
    }
  }

  throw lastError;
}

export const http = {
  get: <T = any>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T = any>(endpoint: string, data?: any, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    }),

  put: <T = any>(endpoint: string, data?: any, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: <T = any>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
};
