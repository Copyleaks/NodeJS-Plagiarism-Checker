export interface SubmissionScanningExclude {
    /**
     * Exclude your submissions from results if their id matches the supplied pattern. Matched submissions will be excluded from batch, internal database and repositories results.
     * * Supported pattern wildcards:
     *  * '*' Matches any, zero or more, characters.
     *  * '.' Matches a single (non whitespace) character
     */
    idPattern?: string;
}
