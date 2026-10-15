/** Response of `Copyleaks.getSupportedFileTypesAsync`. */
export interface CopyleaksSupportedFileTypesResponseModel {
  /** File extensions supported for textual file scans. */
  textual: string[];
  /** File extensions supported for OCR (image) scans. */
  ocr: string[];
}
