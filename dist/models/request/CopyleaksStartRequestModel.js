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
exports.CopyleaksStartErrorHandlings = exports.CopyleaksStartRequestModel = void 0;
class CopyleaksStartRequestModel {
    /**
     * @param trigger A list of scans that you submitted for a check-credits scan and that you would like to submit for a full scan.
     * @param errorHandling When set to ignore (ignore = 1) the trigger scans will start running even if some of them are in error mode, when set to cancel (cancel = 0) the request will be cancelled if any error was found.
     */
    constructor(trigger, errorHandling) {
        this.trigger = trigger;
        this.errorHandling = errorHandling;
    }
}
exports.CopyleaksStartRequestModel = CopyleaksStartRequestModel;
var CopyleaksStartErrorHandlings;
(function (CopyleaksStartErrorHandlings) {
    CopyleaksStartErrorHandlings[CopyleaksStartErrorHandlings["Cancel"] = 0] = "Cancel";
    CopyleaksStartErrorHandlings[CopyleaksStartErrorHandlings["Ignore"] = 1] = "Ignore";
})(CopyleaksStartErrorHandlings = exports.CopyleaksStartErrorHandlings || (exports.CopyleaksStartErrorHandlings = {}));
