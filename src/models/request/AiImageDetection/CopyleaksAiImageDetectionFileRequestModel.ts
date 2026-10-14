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
import { CopyleaksAiImageObjectDetectionModel } from './CopyleaksAiImageObjectDetectionModel.js';

/**
 * Request model for AI image detection with a binary image upload (multipart/form-data).
 * It avoids the base64 overhead of `CopyleaksAiImageDetectionRequestModel`.
 * Use it with `AiImageDetectionClient.submitFileAsync`.
 */
export class CopyleaksAiImageDetectionFileRequestModel {
  /**
   * @param image The image bytes, for example the Buffer returned by `fs.readFileSync`.
   * Minimum 512x512px, maximum 6000x4500px (27 megapixels), less than 32MB.
   * Formats: PNG, JPG, JPEG, BMP, WebP, HEIC/HEIF.
   * @param filename The image file name, with its extension. Up to 255 characters.
   * @param model The AI image detection model, for example `CopyleaksAiImageDetectionModels.AI_IMAGE_1_ULTRA`.
   * @param sandbox Return mock results without using credits. Default: false.
   * @param maskType The type of detection mask to return: "binary", "heatmap" or "none". Default: "binary".
   * See `CopyleaksAiImageDetectionMaskTypes`.
   * @param objectDetection Objects to find in the image, for example [{ object: "face" }]. Up to 3 entries.
   */
  constructor(
    public image: Uint8Array,
    public filename: string,
    public model: string,
    public sandbox: boolean = false,
    public maskType?: string,
    public objectDetection?: CopyleaksAiImageObjectDetectionModel[]) {
  }
}
