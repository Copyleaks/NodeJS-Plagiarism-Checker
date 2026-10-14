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
import { CopyleaksAiImageObjectDetectionModel } from './CopyleaksAiImageObjectDetectionModel.js';

/**
 * Request model for asynchronous AI image detection of an image URL.
 * Copyleaks downloads the image and POSTs the result to `webhooks.url`.
 * The webhook body has the shape of `CopyleaksAiImageDetectionResponseModel`.
 * Use it with `AiImageDetectionClient.submitUrlAsync`.
 */
export class CopyleaksAiImageDetectionAsyncRequestModel {
  /** Publicly accessible URL of the image. */
  public url: string;
  /** The image file name, with its extension: .jpg, .jpeg, .png, .webp, .tiff, .bmp, .heic or .heif. */
  public fileName: string;
  /** The AI image detection model, for example `CopyleaksAiImageDetectionModels.AI_IMAGE_1_ULTRA`. */
  public model: string;
  /** Where Copyleaks sends the result. */
  public webhooks: CopyleaksAsyncWebhooksModel;
  /** The type of detection mask in the result: "binary" (default) or "heatmap". */
  public maskType?: string;
  /** Objects to find in the image, for example [{ object: "face" }]. Up to 3 entries. */
  public objectDetection?: CopyleaksAiImageObjectDetectionModel[];
  /** Headers Copyleaks sends when it downloads the image. Example: [["X-Custom-Auth", "my-token"]] */
  public headers?: string[][];
  /** Return a mock result without using credits. Default: false. */
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
