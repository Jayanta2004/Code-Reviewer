export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000',
  TIMEOUT: 30000,
  ENDPOINTS: {
    REVIEW: '/api/review',
    HEALTH: '/api/health',
  },
} as const;

export const VALIDATION = {
  MAX_CODE_LENGTH: 10000,
  MIN_CODE_LENGTH: 1,
} as const;

export const UI_TEXT = {
  PLACEHOLDER: 'Paste your code here...\n\nTip: Press Ctrl+Enter to analyze',
  EMPTY_STATE: 'Your review will appear here',
  ANALYZING_STATE: 'Processing your code...',
  BUTTON_ANALYZE: 'Analyze Code',
  BUTTON_ANALYZING: 'Analyzing...',
} as const;

export const ERROR_MESSAGES = {
  EMPTY_CODE: 'Please enter some code to review',
  CODE_TOO_LONG: (max: number) => `Code is too long. Maximum ${max} characters allowed`,
  TIMEOUT: 'Request timed out. Please try again.',
  CONNECTION: 'Cannot connect to server. Make sure the backend is running.',
  GENERIC: 'Something went wrong. Please try again.',
  UNEXPECTED: 'An unexpected error occurred.',
} as const;
