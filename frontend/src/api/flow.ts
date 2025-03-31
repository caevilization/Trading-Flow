import { Node, Edge } from 'reactflow';
import { api } from '../utils/api';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  metadata: {
    requestId: string;
    timestamp: string;
    path: string;
    method: string;
  };
}

const BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'}`;

export interface Flow {
  _id: string;
  name: string;
  description?: string;
  versions: {
    version: number;
    nodes: Node[];
    edges: Edge[];
    createdAt: string;
    createdBy: string;
  }[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  visibility: 'public' | 'protected';
  isDeleted: boolean;
  deletedAt?: string;
  deletedBy?: string;
}

// 为了兼容性，添加一个 getter 函数来获取 id
export const getFlowId = (flow: Flow): string => flow._id;

// 验证 API 响应
const validateApiResponse = <T>(response: any): response is ApiResponse<T> => {
  return (
    response &&
    typeof response.success === 'boolean' &&
    'data' in response &&
    response.metadata &&
    typeof response.metadata.requestId === 'string' &&
    typeof response.metadata.timestamp === 'string'
  );
};

// 创建新的 Flow
export const createFlow = async (name: string, description?: string) => {
  try {
    const response = await api.post<ApiResponse<Flow>>(`${BASE_URL}/flow`, {
      name,
      description,
    });

    if (!validateApiResponse<Flow>(response.data)) {
      console.error('Invalid API response format:', response.data);
      throw new Error('Invalid API response format');
    }

    return response.data.data;
  } catch (error: any) {
    console.error('Failed to create flow:', error);
    throw error;
  }
};

// 获取 Flow 列表
export const listFlows = async () => {
  try {
    const response = await api.get<ApiResponse<Flow[]>>(`${BASE_URL}/flow/list`);

    if (!validateApiResponse<Flow[]>(response.data)) {
      console.error('Invalid API response format:', response.data);
      throw new Error('Invalid API response format');
    }

    return response.data.data;
  } catch (error: any) {
    console.error('Failed to list flows:', error);
    throw error;
  }
};

// 获取垃圾桶列表
export const listTrash = async () => {
  try {
    const response = await api.get<ApiResponse<Flow[]>>(`${BASE_URL}/trash/list`);

    if (!validateApiResponse<Flow[]>(response.data)) {
      console.error('Invalid API response format:', response.data);
      throw new Error('Invalid API response format');
    }

    return response.data.data;
  } catch (error: any) {
    console.error('Failed to list trash:', error);
    throw error;
  }
};

// 获取最近文件
export const getRecentFiles = async (limit: number = 10) => {
  try {
    const response = await api.get<ApiResponse<Flow[]>>(`${BASE_URL}/file/recent`, {
      params: { limit },
    });

    if (!validateApiResponse<Flow[]>(response.data)) {
      console.error('Invalid API response format:', response.data);
      throw new Error('Invalid API response format');
    }

    return response.data.data;
  } catch (error: any) {
    console.error('Failed to get recent files:', error);
    throw error;
  }
};

// 获取单个 Flow
export const getFlow = async (flowId: string) => {
  try {
    if (!flowId) {
      throw new Error('Flow ID is required');
    }

    const response = await api.get<ApiResponse<Flow>>(`${BASE_URL}/flow/${flowId}`);

    if (!validateApiResponse<Flow>(response.data)) {
      console.error('Invalid API response format:', response.data);
      throw new Error('Invalid API response format');
    }

    return response.data.data;
  } catch (error: any) {
    console.error('Failed to get flow:', error);
    throw error;
  }
};

// 删除 Flow
export const deleteFlow = async (flowId: string, permanent: boolean = false) => {
  try {
    if (!flowId) {
      throw new Error('Flow ID is required');
    }

    const response = await api.delete<ApiResponse<void>>(`${BASE_URL}/flow/${flowId}`, {
      params: { permanent },
    });

    if (!validateApiResponse<void>(response.data)) {
      console.error('Invalid API response format:', response.data);
      throw new Error('Invalid API response format');
    }

    return response.data.data;
  } catch (error: any) {
    console.error('Failed to delete flow:', error);
    throw error;
  }
};

// 更新 Flow
export const updateFlow = async (
  flowId: string,
  data: {
    name?: string;
    nodes?: Node[];
    edges?: Edge[];
  }
) => {
  try {
    if (!flowId) {
      throw new Error('Flow ID is required');
    }

    const response = await api.put<ApiResponse<Flow>>(`${BASE_URL}/flow/${flowId}`, data);

    if (!validateApiResponse<Flow>(response.data)) {
      console.error('Invalid API response format:', response.data);
      throw new Error('Invalid API response format');
    }

    return response.data.data;
  } catch (error: any) {
    console.error('Failed to update flow:', error);
    throw error;
  }
};
