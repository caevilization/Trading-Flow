import { api } from '../utils/api';
import { ApiResponse } from '../utils/types';
import { API_ENDPOINTS } from '../config/api';

interface GenerateAddressResponse {
  address: string;
}

export const nodeApi = {
  generateAddress: async (chain: 'btc' | 'eth' | 'solana'): Promise<string> => {
    try {
      const response = await api.post<ApiResponse<GenerateAddressResponse>>(
        API_ENDPOINTS.NODE.GENERATE_ADDRESS,
        { chain }
      );
      return response.data.data.address;
    } catch (error: any) {
      console.error('Failed to generate address:', error);
      throw new Error(error.response?.data?.metadata?.error || 'Failed to generate address');
    }
  },
};
