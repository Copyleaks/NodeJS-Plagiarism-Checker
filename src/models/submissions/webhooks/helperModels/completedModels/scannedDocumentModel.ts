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
import { MetadataModel } from "../baseModels/metadataModel";

export class ScannedDocumentModel {
  /*The unique scan id provided by you.*/
  scanId?: string;
  
  /*Total number of words found in the scanned text. */
  totalWords?: number;
  
  /*Number of excluded words in the submitted content. */
  totalExecluded?: number;
  
  /*Overall credits used for the scan. */
  credits?: number;
  
  /*The creation time of the scan. */
  creationTime?: string;
  
  /*Metadata object */
  metadata?: MetadataModel;

  constructor(init?: Partial<ScannedDocumentModel>) {
    if (init) {
      Object.assign(this, init);

      
      if (init.metadata) {
        this.metadata = new MetadataModel(init.metadata);
      }
    }
  }
}
