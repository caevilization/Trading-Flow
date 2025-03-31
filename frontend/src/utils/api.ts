import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  withCredentials: true, // 允许跨域请求携带 cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  response => response,
  async error => {
    // 如果是 401 错误，可能是 token 过期或无效
    if (error.response?.status === 401) {
      // 清除本地存储的认证信息
      localStorage.removeItem('token');
      localStorage.removeItem('userId');

      // 如果不在登录页面，则重定向到登录页面
      if (!window.location.pathname.startsWith('/auth')) {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);
