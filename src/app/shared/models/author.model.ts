import {StoryTreeModel} from './story-tree.model';
import {TextModel} from './text.model';

export class AuthorModel {
  public imgPath: string;
  public description: string;
  public name: string;
  public stories: StoryTreeModel[] = [];
  public texts: TextModel[] = [];
  public following: AuthorModel[] = [];
  public followers: AuthorModel[] = [];


  constructor(imgPath: string, description: string, name: string) {
    this.imgPath = imgPath;
    this.description = description;
    this.name = name;
  }
}
