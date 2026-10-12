/**
 * Response of `Copyleaks.getSupportedFileTypesAsync`.
 * For more info: https://docs.copyleaks.com/reference/actions/miscellaneous/supported-plagiarism-file-types
 */
export interface CopyleaksSupportedFileTypesResponseModel {
    /** File extensions supported for textual file scans. */
    textual: string[];
    /** File extensions supported for OCR (image) scans. */
    ocr: string[];
}
