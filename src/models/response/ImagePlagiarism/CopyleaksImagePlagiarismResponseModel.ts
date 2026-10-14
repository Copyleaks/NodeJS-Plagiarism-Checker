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
 * Response of `ImagePlagiarismClient.submitAsync`: where copies of the image were found on the web.
 * For more info: https://docs.copyleaks.com/reference/data-types/authenticity/results/image-plagiarism-response
 */
export interface CopyleaksImagePlagiarismResponseModel {
  /** The `developerPayload` of the request, unchanged. Null when the request had none. */
  developerPayload?: string | null;
  /** Information about the submitted image and the scan. */
  scannedImage: CopyleaksImagePlagiarismScannedImageModel;
  /** The detection results. */
  matches: CopyleaksImagePlagiarismMatchesModel;
}

/**
 * Information about the submitted image and the scan.
 */
export interface CopyleaksImagePlagiarismScannedImageModel {
  /** The scan id of the request. */
  scanId: string;
  /** The number of credits expected to be charged for the scan. */
  expectedCredits: number;
  /** The number of credits charged for the scan. */
  actualCredits: number;
  /** ISO 8601 creation time of the scan (UTC). */
  creationTime: string;
  /** Width of the image, in pixels. */
  width: number;
  /** Height of the image, in pixels. */
  height: number;
  /** The file name of the request. */
  filename: string;
}

/**
 * The detection results of an image plagiarism scan.
 * An empty `internet` list with zero scores means no copies were found.
 */
export interface CopyleaksImagePlagiarismMatchesModel {
  /** Matching images found on the web, full matches first. Each image URL appears once. */
  internet: CopyleaksImagePlagiarismInternetMatchModel[];
  /** Match counts. */
  score: CopyleaksImagePlagiarismScoreModel;
}

/**
 * A matching image found on the web.
 */
export interface CopyleaksImagePlagiarismInternetMatchModel {
  /** URL of the matching image. */
  url: string;
  /**
   * The type of match: 0 = full (exact or near-exact copy), 1 = partial (cropped, resized or modified).
   * See `CopyleaksImagePlagiarismMatchTypes`.
   */
  matchType: number;
  /** Web pages that show the image. Missing when the image was not found on any page. */
  webPages?: CopyleaksImagePlagiarismWebPageModel[];
}

/**
 * A web page that shows a matching image.
 */
export interface CopyleaksImagePlagiarismWebPageModel {
  /** URL of the web page. */
  url: string;
}

/**
 * Match counts of an image plagiarism scan.
 */
export interface CopyleaksImagePlagiarismScoreModel {
  /** Total number of matching images. */
  totalMatches: number;
  /** Number of full matches (matchType 0). */
  fullMatches: number;
  /** Number of partial matches (matchType 1). */
  partialMatches: number;
}
