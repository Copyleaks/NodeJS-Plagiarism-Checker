//CONFIG FILE WITH CONSTANTS
var Config = {
     'UNDEFINED_COPYLEAKS_HEADER_ERROR_CODE' : 9999,
     'REQUEST_TIMEOUT' : 30000, //30 seconds
     'CONTENT_TYPE_JSON' : 'application/json',
     'CONTENT_TYPE_MULTIPART' : 'multipart/form-data',
     'ACCEPTED_LANGUAGE_HEADER' : 'Accept-Language',
     'CONTENT_TYPE_HEADER' : 'Content-Type',
     'AUTHORIZATION_HEADER' : 'Authorization',
     'COPYLEAKS_ERROR_HEADER' : 'copyleaks-error-code',
     'COPYLEAKS_HEADER_PREFIX' : "copyleaks-",
     'CLIENT_CUSTOM_PREFIX' : "copyleaks-client-custom-",
     'EMAIL_CALLBACK' : 'copyleaks-email-callback',
     'HTTP_CALLBACK' : 'copyleaks-http-completion-callback',
     'IN_PROGRESS_RESULT' : 'copyleaks-in-progress-new-result',
     'SANDBOX_MODE_HEADER' : 'copyleaks-sandbox-mode',
     'PARTIAL_SCAN_HEADER' : 'copyleaks-allow-partial-scan',
     'COMPARE_ONLY' : 'copyleaks-compare-documents-for-similarity',
     'IMPORT_FILE_TO_DATABASE' : 'copyleaks-index-only',
     'RESPONSE_CODE' : 'reponse_code',
     'MAX_FILE_SIZE_BYTES' : 25 * 1024 * 1024, //25MB
     'SERVICE_ENTRY_POINT' : 'https://api.copyleaks.com',
     'SERVICE_VERSION' : 'v1',
     'USER_AGENT' : 'CopyleaksNodejsSDK/1.0',
     'DATE_FORMAT' : 'dd/MM/yyyy HH:mm:ss',
     'SERVICE_PAGE' : 'publisher',
     'E_PRODUCT' : {'Businesses':'businesses', 'Education':'education', 'Websites':'websites'},
     'COPYLEAKS_INTERNAL_ERROR' : 'Sorry we have some internal issues, please try again shortly.',

     'MULTIPART_BOUNDARY' : '--------------------------',
     'MULTIPART_HEADER' : 'Content-Type: multipart/form-data, boundary:',
     'FORM_FIELD_FILE' : 'file'
}
// export the class
module.exports = Config;