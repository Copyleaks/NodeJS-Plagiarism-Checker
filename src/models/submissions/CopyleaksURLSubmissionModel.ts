import { CopyleaksSubmissionModel } from './CopyleaksSubmissionModel.js';
import { SubmissionProperties } from './properties/index.js';

export class CopyleaksURLSubmissionModel extends CopyleaksSubmissionModel {
  /**
   * @param verb HTTP method Copyleaks uses to fetch the url: GET (default), POST or PUT.
   * @param headers Headers Copyleaks sends when it fetches the url, such as a cookie.
   *   When set, no default headers are sent.
   */
  constructor(
    public url: string,
    properties: SubmissionProperties,
    public verb?: string,
    public headers?: string[][]) {
    super(properties);
  }
}