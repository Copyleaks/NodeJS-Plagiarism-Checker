export declare function isSuccessStatusCode(statusCode: number): boolean;
export declare function isUnderMaintenanceResponse(statusCode: number): statusCode is 503;
export declare function isRateLimitResponse(statusCode: number): statusCode is 429;
