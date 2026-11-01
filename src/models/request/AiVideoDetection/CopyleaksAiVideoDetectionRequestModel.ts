import { CopyleaksAsyncWebhooksModel } from '../CopyleaksAsyncWebhooksModel.js';

/** Request of `AiVideoDetectionClient.submitAsync`. */
export class CopyleaksAiVideoDetectionRequestModel {
  /** Publicly accessible URL of the video. */
  public url: string;
  /**
   * The video file name, with its extension. Up to 255 characters.
   * Extensions: .mp4, .avi, .mov, .mkv, .webm, .flv, .wmv, .mpg, .m4v, .3gp, .mxf.
   */
  public filename: string;
  /** See `CopyleaksAiVideoDetectionModels`. */
  public model: string;
  /** Where Copyleaks sends the result. */
  public webhooks: CopyleaksAsyncWebhooksModel;
  /** Headers Copyleaks sends when it downloads the video. Example: [["X-Custom-Auth", "my-token"]] */
  public headers?: string[][];
  /** The HTTP method Copyleaks uses to download the video: GET, POST or PUT. */
  public verb?: string;
  /** Return a mock result without using credits. */
  public sandbox?: boolean;
  /** A string that Copyleaks returns in the webhook, to match the result with your records. */
  public developerPayload?: string;

  constructor(init: {
    url: string;
    filename: string;
    model: string;
    webhooks: CopyleaksAsyncWebhooksModel;
    headers?: string[][];
    verb?: string;
    sandbox?: boolean;
    developerPayload?: string;
  }) {
    this.url = init.url;
    this.filename = init.filename;
    this.model = init.model;
    this.webhooks = init.webhooks;
    if (init.headers !== undefined) {
      this.headers = init.headers;
    }
    if (init.verb !== undefined) {
      this.verb = init.verb;
    }
    if (init.sandbox !== undefined) {
      this.sandbox = init.sandbox;
    }
    if (init.developerPayload !== undefined) {
      this.developerPayload = init.developerPayload;
    }
  }
}
