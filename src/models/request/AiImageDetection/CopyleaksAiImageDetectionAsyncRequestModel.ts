import { CopyleaksAsyncWebhooksModel } from '../CopyleaksAsyncWebhooksModel.js';
import { CopyleaksAiImageObjectDetectionModel } from './CopyleaksAiImageObjectDetectionModel.js';

/** Request of `AiImageDetectionClient.submitUrlAsync`. */
export class CopyleaksAiImageDetectionAsyncRequestModel {
  /** Publicly accessible URL of the image. */
  public url: string;
  /** The image file name, with its extension: .jpg, .jpeg, .png, .webp, .tiff, .bmp, .heic or .heif. */
  public fileName: string;
  /** See `CopyleaksAiImageDetectionModels`. */
  public model: string;
  /** Where Copyleaks sends the result. */
  public webhooks: CopyleaksAsyncWebhooksModel;
  /** Detection mask: "binary" (default) or "heatmap". */
  public maskType?: string;
  /** Objects to find in the image, for example [{ object: "face" }]. Up to 3 entries. */
  public objectDetection?: CopyleaksAiImageObjectDetectionModel[];
  /** Headers Copyleaks sends when it downloads the image. Example: [["X-Custom-Auth", "my-token"]] */
  public headers?: string[][];
  /** Return a mock result without using credits. */
  public sandbox?: boolean;
  /** A string that Copyleaks returns in the webhook, to match the result with your records. */
  public developerPayload?: string;

  constructor(init: {
    url: string;
    fileName: string;
    model: string;
    webhooks: CopyleaksAsyncWebhooksModel;
    maskType?: string;
    objectDetection?: CopyleaksAiImageObjectDetectionModel[];
    headers?: string[][];
    sandbox?: boolean;
    developerPayload?: string;
  }) {
    this.url = init.url;
    this.fileName = init.fileName;
    this.model = init.model;
    this.webhooks = init.webhooks;
    assignDefined(this, 'maskType', init.maskType);
    assignDefined(this, 'objectDetection', init.objectDetection);
    assignDefined(this, 'headers', init.headers);
    assignDefined(this, 'sandbox', init.sandbox);
    assignDefined(this, 'developerPayload', init.developerPayload);
  }
}

function assignDefined<T, K extends keyof T>(target: T, key: K, value: T[K] | undefined): void {
  if (value !== undefined) {
    target[key] = value;
  }
}
