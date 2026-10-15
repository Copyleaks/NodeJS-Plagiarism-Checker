export class AuthExipredException extends Error {
  constructor() {
    super('Authentication Expired. Need to login again.');
    this.name = 'AuthExipredException';
  }
}