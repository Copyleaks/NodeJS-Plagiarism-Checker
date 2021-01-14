import { CopyleaksFileSubmissionModel } from './CopyleaksFileSubmissionModel';
import { SubmissionProperties } from './properties';
export declare class CopyleaksFileOcrSubmissionModel extends CopyleaksFileSubmissionModel {
    langCode: string;
    /**
     * @param langCode The language code of your content. The selected language should be on the OCR supported languages list. https://api.copyleaks.com/documentation/v3/specifications/ocr-languages
     * @param base64 A base64 data string of a file. If you would like to scan plain text, encode it as base64 and submit it.
     * @param filename The name of the file as it will appear in the Copyleaks scan report Make sure to include the right extension for your filetype.
     * @param properties Check inner properties for more details.
     */
    constructor(langCode: string, base64: string, filename: string, properties: SubmissionProperties);
}
