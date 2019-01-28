import {StoryTreeModel} from './story-tree.model';
import {TextModel} from './text.model';

export class AuthorModel {
  public _id: string;
  public imgPath: string;
  public description: string;
  public name: string;
  public stories: StoryTreeModel[] = [];
  public texts: TextModel[] = [];
  public following: AuthorModel[] = [];
  public followers: AuthorModel[] = [];


  constructor(imgPath: string, description: string, name: string, _id: string) {
    this._id = _id;
    this.imgPath = imgPath;
    this.description = description;
    this.name = name;
  }
}
