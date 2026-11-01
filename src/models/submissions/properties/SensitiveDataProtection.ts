/** Sensitive data to mask with # characters in the scanned document. Needs a plan of 2500 pages or more. */
export interface SubmissionSensitiveData {
  /** Driver's license numbers of Australia, Canada, the UK, the USA, Japan, Spain and Germany. */
  driversLicense?: boolean;
  /**
   * Credentials: authentication tokens, AWS credentials, Azure and other JSON Web Tokens, HTTP basic auth headers,
   * Google Cloud service account credentials and API keys, encryption keys and passwords.
   */
  credentials?: boolean;
  /**
   * Passport numbers of Canada, China, France, Germany, Ireland, Japan, Korea, Mexico, Spain, the UK, the USA,
   * the Netherlands, Poland, Sweden, Australia, Singapore and Taiwan.
   */
  passport?: boolean;
  /** Network identifiers: IP addresses, MAC addresses and local MAC addresses. */
  network?: boolean;
  url?: boolean;
  emailAddress?: boolean;
  /** Credit card numbers and credit card track numbers. */
  creditCard?: boolean;
  phoneNumber?: boolean;
}