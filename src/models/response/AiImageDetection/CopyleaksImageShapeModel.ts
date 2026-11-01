/** Dimensions of the analyzed image. */
export class CopyleaksImageShapeModel {
    /** In pixels. */
    public height: number;

    /** In pixels. */
    public width: number;

    constructor(height: number, width: number) {
        this.height = height;
        this.width = width;
    }
}
