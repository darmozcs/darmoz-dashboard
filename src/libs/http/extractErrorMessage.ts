interface ErrorResponseBody {
  message?: string; // darmoz-auth ErrorResponse shape
  detail?: string; // darmoz-mail RFC7807 ProblemDetail shape
}

export const extractErrorMessage = (error: unknown, fallback: string): string => {
  const data = (error as { response?: { data?: ErrorResponseBody } })?.response
    ?.data;
  return data?.message || data?.detail || fallback;
};
