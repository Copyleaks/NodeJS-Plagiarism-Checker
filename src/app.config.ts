export class CopyleaksConfig {
  private static _API_SERVER_URI = 'https://api.copyleaks.com'
  private static _IDENTITY_SERVER_URI = 'https://id.copyleaks.com'
  private static _USER_AGENT = 'node-sdk/7.0.0'

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