/*
 The MIT License(MIT)

 Copyright(c) 2016 Copyleaks LTD (https://copyleaks.com)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
*/
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
