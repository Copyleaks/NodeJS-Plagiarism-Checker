"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyleaksNaturalLanguageSubmissionModel = void 0;
const CopyleaksAIDetectionSubmissionModel_1 = require("./CopyleaksAIDetectionSubmissionModel");
class CopyleaksNaturalLanguageSubmissionModel extends CopyleaksAIDetectionSubmissionModel_1.CopyleaksAIDetectionSubmissionModel {
    /**
     * @param text a text string.  25000 <= characters >= 255.
     * @param sandbox You can test the integration with the Copyleaks API for free using the sandbox mode. You will be able to submit content for a scan and get back mock results, simulating the way Copyleaks will work to make sure that you successfully integrated with the API.
     * @param language The language code of your content. The selected language should be on the Supported Languages list above. If the 'language' field is not supplied , our system will automatically detect the language of the content.
     */
    constructor(text, sandbox, language) {
        super(text, sandbox);
        this.language = language;
    }
}
exports.CopyleaksNaturalLanguageSubmissionModel = CopyleaksNaturalLanguageSubmissionModel;
