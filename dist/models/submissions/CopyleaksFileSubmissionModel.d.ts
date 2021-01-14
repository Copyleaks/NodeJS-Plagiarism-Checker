import { CopyleaksSubmissionModel } from './CopyleaksSubmissionModel';
import { SubmissionProperties } from './properties';
export declare class CopyleaksFileSubmissionModel extends CopyleaksSubmissionModel {
    base64: string;
    filename: string;
    /**
     * @param base64 A base64 data string of a file. If you would like to scan plain text, encode it as base64 and submit it.
     * @param filename The name of the file as it will appear in the Copyleaks scan report Make sure to include the right extension for your filetype.
     * @param properties Check inner properties for more details.
     */
    constructor(base64: string, filename: string, properties: SubmissionProperties);
}
