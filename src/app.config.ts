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

export class CopyleaksConfig {
  private static _API_SERVER_URI = 'https://api.copyleaks.com'
  private static _IDENTITY_SERVER_URI = 'https://id.copyleaks.com'
  private static _USER_AGENT = 'node-sdk/3.0'

  static set API_SERVER_URI(url: string) {
    this._API_SERVER_URI = url;
  }
  static get API_SERVER_URI() {
    return this._API_SERVER_URI;
  }

  static set IDENTITY_SERVER_URI(url: string) {
    this._IDENTITY_SERVER_URI = url;
  }
  static get IDENTITY_SERVER_URI() {
    return this._IDENTITY_SERVER_URI;
  }

  static get USER_AGENT() {
    return this._USER_AGENT;
  }
}