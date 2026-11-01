import { SubmissionProperties } from './properties/index.js';

export class CopyleaksSubmissionModel {
  constructor(public properties: SubmissionProperties) {
    this.properties = properties;
  }
}