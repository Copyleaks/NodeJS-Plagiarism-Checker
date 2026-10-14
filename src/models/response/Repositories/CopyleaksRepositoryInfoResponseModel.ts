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
 * Response of `Copyleaks.getRepositoryInfoAsync`: information about a Private Cloud Hub repository.
 * For more info: https://docs.copyleaks.com/reference/actions/private-cloud-hub/info
 */
export interface CopyleaksRepositoryInfoResponseModel {
  /** The repository id. */
  id: string;
  /** The repository name. */
  name: string;
  /** The repository description. */
  description?: string | null;
  /** Your permission level on the repository. */
  permission: number;
  /**
   * The repository status: 0 = running, 1 = pending for deletion, 2 = error, 3 = updating, 4 = payment required.
   */
  status: number;
  /** Credit limit of the repository. */
  maxCredits?: number;
  /** Credits used by the repository. */
  currentCredits?: number;
  /**
   * The masking policy: 0 = no masking, 1 = mask other users' documents, 2 = mask all documents.
   * See `MaskingPolicy`.
   */
  maskingPolicy?: number;
  /** Creation time of the repository. */
  creationTime?: string;
}
