export function isSuccessStatusCode(statusCode: number) {
  return statusCode >= 200 && statusCode <= 299
}

export function isUnderMaintenanceResponse(statusCode: number) {
  return statusCode === 503;
}

export function isRateLimitResponse(statusCode: number) {
  return statusCode === 429;
}