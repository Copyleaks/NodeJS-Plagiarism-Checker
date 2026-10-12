import { CopyleaksSubmissionModel } from './CopyleaksSubmissionModel.js';
import { SubmissionProperties } from './properties/index.js';
export declare class CopyleaksURLSubmissionModel extends CopyleaksSubmissionModel {
    url: string;
    /**
     * @param url The url to be scanned
     * @param properties Check inner properties for more details.
     */
    constructor(url: string, properties: SubmissionProperties);
}
