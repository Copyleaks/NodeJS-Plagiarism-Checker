import { AuthExipredException } from "../models/exceptions/index.js";
import { CopyleaksAuthToken } from "../models/response/index.js";

export class ClientUtils {
    public static verifyAuthToken(authToken: CopyleaksAuthToken) {
        const date = new Date(Date.now());
        date.setMinutes(date.getMinutes() + 5); // adds 5 minutes ahead for a safety shield.

        const expiresDate = new Date(authToken['.expires']);

        if (expiresDate.getTime() <= date.getTime()) {
            throw new AuthExipredException();
        }
    }
}
