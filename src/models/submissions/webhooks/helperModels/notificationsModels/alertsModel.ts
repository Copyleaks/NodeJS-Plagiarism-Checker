import { CopyleaksAlertCodes } from '../../../../constants/CopyleaksAlertCodes.js';
import { CopyleaksAiTextDetectionResponseModel } from '../../../../response/AiTextDetection/CopyleaksAiTextDetectionResponseModel.js';

export class AlertsModel {
  
  category!: number;
  
  /** Unique code of the alert, see `CopyleaksAlertCodes`. */
  code!: string;
  
  /** Human-readable title. */
  title!: string;
  
  /** Human-readable description. */
  message!: string;

  /** Page about this alert. Not sent for every alert (for example, not for suspected-ai-text). */
  helpLink?: string;

  /** Importance of the alert. */
  severity!: number;

  /** More data about the alert, as a JSON string. Can be missing or empty. */
  additionalData?: string;

  constructor(init?: Partial<AlertsModel>) {
    Object.assign(this, init);
  }

  /**
   * Decodes `additionalData` of a "suspected-ai-text" alert. Returns null for other alert codes, for missing
   * or empty data, and for JSON that is not an object. Trailing NUL characters and ASCII whitespace are
   * removed before parsing; `additionalData` itself is not changed.
   * @throws {SyntaxError} When `additionalData` is not valid JSON.
   */
  public getAIDetectionResult(): CopyleaksAiTextDetectionResponseModel | null {
    if (this.code !== CopyleaksAlertCodes.SUSPECTED_AI_TEXT || !this.additionalData) {
      return null;
    }
    const json = trimTrailingNulAndWhitespace(this.additionalData);
    if (json.length === 0) {
      return null;
    }
    const parsed = JSON.parse(json);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return null;
    }
    return new CopyleaksAiTextDetectionResponseModel(parsed);
  }
}

/** Removes trailing NUL characters and ASCII whitespace: the server can pad additionalData with NULs. */
function trimTrailingNulAndWhitespace(value: string): string {
  let end = value.length;
  while (end > 0 && isNulOrAsciiWhitespace(value.charCodeAt(end - 1))) {
    end--;
  }
  return value.substring(0, end);
}

/** NUL or ASCII whitespace (tab, LF, VT, FF, CR, space). Unicode whitespace such as U+00A0 is not included. */
function isNulOrAsciiWhitespace(code: number): boolean {
  return code === 0x00
    || code === 0x09
    || code === 0x0a
    || code === 0x0b
    || code === 0x0c
    || code === 0x0d
    || code === 0x20;
}
