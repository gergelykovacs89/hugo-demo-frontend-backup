import {TextModel} from './text.model';
import {AuthorModel} from './author.model';

export class StoryTreeModel {
  public id: number;
  public storyTitle: string;
  public storySummary: string;
  public author: AuthorModel;
  public imgPath: string;
  public rootText: TextModel;


  constructor(id: number, storyTitle: string, storySummary: string, author: AuthorModel, imgPath: string, rootText: TextModel) {
    this.id = id;
    this.storyTitle = storyTitle;
    this.storySummary = storySummary;
    this.author = author;
    this.imgPath = imgPath;
    this.rootText = rootText;
  }
}
