import { CopyleaksSubmissionModel } from './CopyleaksSubmissionModel';
import { SubmissionProperties } from './properties';
export declare class CopyleaksURLSubmissionModel extends CopyleaksSubmissionModel {
    url: string;
    /**
     * @param url The url to be scanned
     * @param properties Check inner properties for more details.
     */
    constructor(url: string, properties: SubmissionProperties);
}
