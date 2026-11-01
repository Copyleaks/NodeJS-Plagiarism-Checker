import { SubmissionProperties } from '../models/submissions/properties/SubmissionProperties.js';

/**
 * Returns the submission as it is sent to the API. The deprecated `pdf.colors.title` is sent as
 * `titles`, the field name the API reads. The caller's object is not changed.
 * @internal
 */
export function toWireSubmission<T extends { properties?: SubmissionProperties }>(submission: T): T {
  const pdf = submission?.properties?.pdf;
  const colors = pdf?.colors;
  if (!colors || colors.title === undefined) {
    return submission;
  }
  const { title, ...otherColors } = colors;
  return {
    ...submission,
    properties: {
      ...submission.properties,
      pdf: { ...pdf, colors: { ...otherColors, titles: colors.titles ?? title } },
    },
  };
}

const IMAGE_CONTENT_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.bmp': 'image/bmp',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.heic': 'image/heic',
  '.heif': 'image/heif',
  '.tif': 'image/tiff',
  '.tiff': 'image/tiff',
};

/**
 * The content type of an image file part, from its file name extension.
 * @internal
 */
export function imageContentType(filename: string): string {
  const dot = filename.lastIndexOf('.');
  const extension = dot >= 0 ? filename.slice(dot).toLowerCase() : '';
  return IMAGE_CONTENT_TYPES[extension] ?? 'application/octet-stream';
}

/**
 * Builds a multipart/form-data body with one file field and text fields.
 * Text fields whose value is undefined are left out.
 * @internal
 */
export function buildMultipartForm(
  file: { field: string; data: Uint8Array; filename: string },
  fields: Record<string, string | undefined>): FormData {
  if (typeof FormData === 'undefined' || typeof Blob === 'undefined') {
    throw new Error('Image uploads need Node.js 18 or later (global FormData and Blob).');
  }
  if (!(file.data instanceof Uint8Array)) {
    throw new TypeError(`${file.field} must be a Buffer or Uint8Array with the file bytes.`);
  }
  const form = new FormData();
  // A Buffer is never backed by a SharedArrayBuffer here; the cast only narrows the generic type.
  form.append(file.field, new Blob([file.data as Uint8Array<ArrayBuffer>], { type: imageContentType(file.filename) }), file.filename);
  for (const [name, value] of Object.entries(fields)) {
    if (value !== undefined) {
      form.append(name, value);
    }
  }
  return form;
}
