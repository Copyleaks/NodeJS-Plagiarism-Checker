/** Request of `ImagePlagiarismClient.submitAsync`. */
export class CopyleaksImagePlagiarismRequestModel {
  /**
   * @param image The image bytes, for example from `fs.readFileSync`. Under 20 MB, up to 75 megapixels.
   * @param filename File name with extension (.jpg, .jpeg, .png, .gif, .bmp, .webp or .ico), up to 255 characters.
   * @param sandbox Return mock results without using credits.
   * @param developerPayload Returned unchanged in the response, to match the result with your records.
   */
  constructor(
    public image: Uint8Array,
    public filename: string,
    public sandbox: boolean = false,
    public developerPayload?: string) {
  }
}
