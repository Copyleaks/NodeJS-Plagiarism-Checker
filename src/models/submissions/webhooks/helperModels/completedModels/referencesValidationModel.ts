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
 * Citation Checker summary of the completed webhook, returned when `properties.references.validate` was true.
 * The results of each reference are in the crawled version of the scan.
 */
export class ReferencesValidationModel {
  /*Counts of the references that were found and validated. */
  summary?: ReferencesValidationSummaryModel;

  constructor(init?: Partial<ReferencesValidationModel>) {
    Object.assign(this, init);
  }
}

/**
 * Counts of the references that were found and validated.
 */
export interface ReferencesValidationSummaryModel {
  /*Total number of references found in the scanned content. */
  total?: number;
  /*Number of references identified as academic. */
  academic?: number;
  /*Number of academic references fully confirmed against the Copyleaks academic citation index. */
  academicValidated?: number;
  /*Number of non-academic references fully confirmed against their cited source. */
  nonAcademicValidated?: number;
}
