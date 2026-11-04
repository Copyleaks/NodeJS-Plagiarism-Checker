import { CopyleaksAuthToken, CopyleaksCorrectionTypesResponseModel, CopyleaksWritingAssistantResponseModel } from '../models/response/index.js';
import { CopyleaksWritingAssistantSubmissionModel } from '../models/submissions/index.js';
import { ClientUtils } from '../utils/client-utils.utils.js';
import { CopyleaksHttp } from '../http/CopyleaksHttp.js';
import { CopyleaksOptions } from '../http/CopyleaksOptions.js';

/** Grammar Checker (Writing Assistant). */
export class WritingAssistantClient {
    private readonly http: CopyleaksHttp;

    /**
     * @param options Optional settings, see `CopyleaksOptions`. `new Copyleaks(options)` passes its own options.
     */
    constructor(options?: CopyleaksOptions) {
        this.http = new CopyleaksHttp(options);
    }

    /**
     * Suggests corrections to the text.
     * For more info: https://docs.copyleaks.com/reference/actions/writing-assistant/check
     * @param scanId Your own ID for the scan.
     */
    public async submitTextAsync(authToken: CopyleaksAuthToken, scanId: string, submission: CopyleaksWritingAssistantSubmissionModel): Promise<CopyleaksWritingAssistantResponseModel> {
        ClientUtils.verifyAuthToken(authToken);
        const response = await this.http.request<CopyleaksWritingAssistantResponseModel>({
            method: 'POST',
            url: this.http.apiUrl(`/v1/writing-feedback/${scanId}/check`),
            authToken,
            body: submission,
        });
        return response.data;
    }

    /**
     * Correction types of the Grammar Checker. They apply to all supported languages. No login needed.
     * For more info: https://docs.copyleaks.com/reference/actions/writing-assistant/correction-types
     * @param languageCode Language of the returned texts.
     */
    public getCorrectionTypesAsync(languageCode: string): Promise<CopyleaksCorrectionTypesResponseModel>;
    /**
     * Correction types of the Grammar Checker. They apply to all supported languages.
     * For more info: https://docs.copyleaks.com/reference/actions/writing-assistant/correction-types
     * @param authToken Optional, the endpoint is public. When set, it is sent as the `Authorization` header and its expiry is not checked.
     * @param languageCode Language of the returned texts.
     */
    public getCorrectionTypesAsync(authToken: CopyleaksAuthToken | undefined, languageCode: string): Promise<CopyleaksCorrectionTypesResponseModel>;
    public async getCorrectionTypesAsync(authTokenOrLanguageCode: CopyleaksAuthToken | string | undefined, languageCode?: string): Promise<CopyleaksCorrectionTypesResponseModel> {
        // A string first argument is the language only when no second argument follows, so a string passed in the
        // token position (for example `token.access_token`) never ends up in the URL. A string is not a token, so it is not sent.
        const languageOnly = typeof authTokenOrLanguageCode === 'string' && languageCode === undefined;
        const language = languageOnly ? authTokenOrLanguageCode : languageCode;
        const authToken = typeof authTokenOrLanguageCode === 'object' ? authTokenOrLanguageCode : undefined;
        if (!language) {
            throw new TypeError('languageCode is required');
        }
        const response = await this.http.request<CopyleaksCorrectionTypesResponseModel>({
            method: 'GET',
            url: this.http.apiUrl(`/v1/writing-feedback/correction-types/${language}`),
            authToken,
        });
        return response.data;
    }
}
