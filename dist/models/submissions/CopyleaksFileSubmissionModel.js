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
exports.CopyleaksFileSubmissionModel = void 0;
const CopyleaksSubmissionModel_1 = require("./CopyleaksSubmissionModel");
class CopyleaksFileSubmissionModel extends CopyleaksSubmissionModel_1.CopyleaksSubmissionModel {
    /**
     * @param base64 A base64 data string of a file. If you would like to scan plain text, encode it as base64 and submit it.
     * @param filename The name of the file as it will appear in the Copyleaks scan report Make sure to include the right extension for your filetype.
     * @param properties Check inner properties for more details.
     */
    constructor(base64, filename, properties) {
        super(properties);
        this.base64 = base64;
        this.filename = filename;
    }
}
exports.CopyleaksFileSubmissionModel = CopyleaksFileSubmissionModel;
