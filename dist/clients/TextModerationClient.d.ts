import { CopyleaksAuthToken, TextModerationResponseModel } from "../models/response";
import { CopyleaksTextModerationRequestModel } from "../models/request/TextModeration/CopyleaksTextModerationRequestModel";
export declare class TextModerationClient {
    submitTextAsync(authToken: CopyleaksAuthToken, scanId: string, submission: CopyleaksTextModerationRequestModel): Promise<TextModerationResponseModel>;
}
