export interface PageResponse {
  total: number;
  skip: number;
  limit: number;
}

export interface ApiError {
  response?: {
    data?: {
      message: string;
    };
  };
}
