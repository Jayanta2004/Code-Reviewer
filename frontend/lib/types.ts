export interface CodeReviewRequest {
  code: string;
}

export interface CodeReviewResponse {
  review?: string;
  error?: string;
}

export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy';
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
