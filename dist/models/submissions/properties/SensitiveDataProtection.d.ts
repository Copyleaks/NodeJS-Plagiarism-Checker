export interface SubmissionSensitiveData {
    /**
     * Mask driver's license numbers from the scanned document with # characters. Available for users on a plan for 2500 pages or more.
     * * Supported Types:
     *  * Australia driver's license number
     *  * Canada driver's license number
     *  * United Kingdom driver's license number
     *  * USA drivers license number
     *  * Japan driver's license number
     *  * Spain driver's license number
     *  * Germany driver's license number
     */
    driversLicense?: boolean;
    /**
     * Mask credentials from the scanned document with # characters. Available for users on a plan for 2500 pages or more.
     * * Supported Types:
     *  * Authentication token
     *  * Amazon Web Services credentials
     *  * Azure JSON Web Token
     *  * HTTP basic authentication header
     *  * Google Cloud Platform service account credentials
     *  * Google Cloud Platform API key
     *  * JSON Web Token
     *  * Encryption key
     *  * Password
     */
    credentials?: boolean;
    /**
     * Mask passports from the scanned document with # characters. Available for users on a plan for 2500 pages or more.
     * * Supported Types:
     *  * Canada passport number
     *  * China passport number
     *  * France passport number
     *  * Germany passport number
     *  * Ireland passport number
     *  * Japan passport number
     *  * Korea passport number
     *  * Mexico passport number
     *  * Spain passport number
     *  * United Kingdom passport number
     *  * USA passport number
     *  * Netherlands passport number
     *  * Poland passport
     *  * Sweden passport number
     *  * Australia passport number
     *  * Singapore passport number
     *  * Taiwan passport number
     */
    passport?: boolean;
    /**
     * Mask network identifiers from the scanned document with # characters. Available for users on a plan for 2500 pages or more.
     * * Supported Types:
     *  * IP address
     *  * Local MAC address
     *  * MAC address
     */
    network?: boolean;
    /**
     * Mask url from the scanned document with # characters. Available for users on a plan for 2500 pages or more.
     */
    url?: boolean;
    /**
     * Mask email addresses from the scanned document with # characters. Available for users on a plan for 2500 pages or more.
     */
    emailAddress?: boolean;
    /**
     * Mask credit card numbers and credit card track numbers from the scanned document with # characters. Available for users on a plan for 2500 pages or more.
     */
    creditCard?: boolean;
    /**
     * Mask phone numbers from the scanned document with # characters. Available for users on a plan for 2500 pages or more.
     */
    phoneNumber?: boolean;
}
