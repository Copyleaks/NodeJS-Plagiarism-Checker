import { CopyleaksFileSubmissionModel } from './CopyleaksFileSubmissionModel.js';
import { SubmissionProperties } from './properties/index.js';

export class CopyleaksFileOcrSubmissionModel extends CopyleaksFileSubmissionModel {
  /**
   * @param langCode Language of the text in the image, see `Copyleaks.getOCRSupportedLanguagesAsync`.
   */
  constructor(
    public langCode: string,
    base64: string,
    filename: string,
    properties: SubmissionProperties) {
    super(base64, filename, properties);
  }
}