import { CopyleaksSubmissionModel } from './CopyleaksSubmissionModel.js';
import { SubmissionProperties } from './properties/index.js';

export class CopyleaksFileSubmissionModel extends CopyleaksSubmissionModel {
  /**
   * @param base64 The file, base64-encoded. To scan plain text, base64-encode the text.
   * @param filename File name, shown in the report. Use the right extension for the file type.
   */
  constructor(
    public base64: string,
    public filename: string,
    properties: SubmissionProperties) {
    super(properties);
  }
}