import { ModerationsModel } from "./Submodules/ModerationsModel";
import { TextModerationsLegendModel } from "./Submodules/TextModerationsLegendModel";
import { TextModerationScannedDocumentModel } from "./Submodules/TextModerationScannedDocumentModel";

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
export class CopyleaksTextModerationResponseModel {

  /*Moderated text segments detected in the input text.*/
  public moderations: ModerationsModel;

  /*An array that provides a lookup for the labels referenced by their numerical indices in the text.chars.labels array. 
    Each object within this legend array defines a specific label that was used in the scan.*/
  public legend: TextModerationsLegendModel[];

  /*General information about the scanned document.*/
  public scannedDocument: TextModerationScannedDocumentModel;

  constructor(init: {
    moderations: ModerationsModel;
    legend: TextModerationsLegendModel[];
    scannedDocument: TextModerationScannedDocumentModel;
  }) {
    this.moderations = init.moderations;
    this.legend = init.legend;
    this.scannedDocument = init.scannedDocument;
  }
}
