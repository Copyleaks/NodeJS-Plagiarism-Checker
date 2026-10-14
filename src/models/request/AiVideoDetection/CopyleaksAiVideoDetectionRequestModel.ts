/*
 The MIT License(MIT)

 Copyright(c) 2016 Copyleaks LTD (https://copyleaks.com)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
*/
import { CopyleaksAsyncWebhooksModel } from '../CopyleaksAsyncWebhooksModel.js';

/**
 * Request model for the AI Video Detector.
 * Copyleaks downloads the video from `url` and POSTs the result to `webhooks.url`.
 * The webhook body is a `CopyleaksAiVideoDetectionResponseModel`.
 * Use it with `AiVideoDetectionClient.submitAsync`.
 */
export class CopyleaksAiVideoDetectionRequestModel {
  /** Publicly accessible URL of the video. */
  public url: string;
  /**
   * The video file name, with its extension. Up to 255 characters.
   * Extensions: .mp4, .avi, .mov, .mkv, .webm, .flv, .wmv, .mpg, .m4v, .3gp, .mxf.
   */
  public filename: string;
  /** The AI video detection model, for example `CopyleaksAiVideoDetectionModels.AI_VIDEO_1_PRO`. */
  public model: string;
  /** Where Copyleaks sends the result. */
  public webhooks: CopyleaksAsyncWebhooksModel;
  /** Headers Copyleaks sends when it downloads the video. Example: [["X-Custom-Auth", "my-token"]] */
  public headers?: string[][];
  /** The HTTP method Copyleaks uses to download the video: GET, POST or PUT. */
  public verb?: string;
  /** Return a mock result without using credits. Default: false. */
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
