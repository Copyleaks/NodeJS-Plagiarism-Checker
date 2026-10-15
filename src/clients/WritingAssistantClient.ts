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
     * Correction types of the Grammar Checker. They apply to all supported languages.
     * For more info: https://docs.copyleaks.com/reference/actions/writing-assistant/correction-types
     * @param languageCode Language of the returned texts.
     */
    public async getCorrectionTypesAsync(authToken: CopyleaksAuthToken, languageCode: string): Promise<CopyleaksCorrectionTypesResponseModel> {
        ClientUtils.verifyAuthToken(authToken);
        const response = await this.http.request<CopyleaksCorrectionTypesResponseModel>({
            method: 'GET',
            url: this.http.apiUrl(`/v1/writing-feedback/correction-types/${languageCode}`),
            authToken,
        });
        return response.data;
    }
}
