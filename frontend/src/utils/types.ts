export interface ApiResponse<T> {
  success: boolean;
  data: T;
  metadata: {
    requestId: string;
    timestamp: string;
    path: string;
    method: string;
  };
}
