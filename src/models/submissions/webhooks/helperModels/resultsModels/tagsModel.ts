export class TagsModel {
  
  /** Unique ID of the tag type. */
  code?: string;
  
  title?: string;
  
  description?: string;

  constructor(init?: Partial<TagsModel>) {
    Object.assign(this, init);
  }
}
