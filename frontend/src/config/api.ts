const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const API_CONFIG = {
  BASE_URL,
  TIMEOUT: 10000, // 10 seconds
  RETRY_COUNT: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

export const API_ENDPOINTS = {
  NODE: {
    GENERATE_ADDRESS: `${BASE_URL}/node/address`,
  },
  MILL: {
    FLOW: `${BASE_URL}/mill/flow`,
    FLOW_LIST: `${BASE_URL}/mill/flow/list`,
    TRASH_LIST: `${BASE_URL}/mill/trash/list`,
    RECENT_FILES: `${BASE_URL}/mill/file/recent`,
  },
} as const;
