import axios, { AxiosError } from 'axios';
import { API_CONFIG } from './constants';
import type { CodeReviewResponse, HealthCheckResponse } from './types';

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const reviewCode = async (code: string): Promise<string> => {
  try {
    const { data } = await axios.post<CodeReviewResponse>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REVIEW}`,
      { code },
      { timeout: API_CONFIG.TIMEOUT }
    );

    if (data.error) {
      throw new ApiError(data.error, 400);
    }

    if (!data.review) {
      throw new ApiError('No review content received', 500);
    }

    return data.review;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<CodeReviewResponse>;
      
      if (axiosError.code === 'ECONNABORTED') {
        throw new ApiError('Request timed out', 408, error);
      }
      
      if (axiosError.response?.data?.error) {
        throw new ApiError(
          axiosError.response.data.error,
          axiosError.response.status,
          error
        );
      }
      
      if (!axiosError.response) {
        throw new ApiError('Cannot connect to server', 503, error);
      }
      
      throw new ApiError(
        'Failed to process request',
        axiosError.response.status,
        error
      );
    }

    throw new ApiError('An unexpected error occurred', 500, error);
  }
};

export const checkHealth = async (): Promise<boolean> => {
  try {
    const { data } = await axios.get<HealthCheckResponse>(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.HEALTH}`,
      { timeout: 5000 }
    );
    return data.status === 'healthy';
  } catch {
    return false;
  }
};
