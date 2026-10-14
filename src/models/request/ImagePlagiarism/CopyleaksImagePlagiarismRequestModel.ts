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

/**
 * Request model for the Image Plagiarism Detector: search the web for copies of an image.
 * The image is uploaded as multipart/form-data. Use it with `ImagePlagiarismClient.submitAsync`.
 */
export class CopyleaksImagePlagiarismRequestModel {
  /**
   * @param image The image bytes, for example the Buffer returned by `fs.readFileSync`.
   * Less than 20MB, up to 75 megapixels. Formats: JPG, JPEG, PNG, GIF, BMP, WebP, ICO.
   * @param filename The image file name, with its extension: .jpg, .jpeg, .png, .gif, .bmp, .webp or .ico. Up to 255 characters.
   * @param sandbox Return mock results without using credits. Default: false.
   * @param developerPayload A string that is returned unchanged in the response, to match the result with your records.
   */
  constructor(
    public image: Uint8Array,
    public filename: string,
    public sandbox: boolean = false,
    public developerPayload?: string) {
  }
}
