import {AuthorModel} from './author.model';

export class TextModel {

  public textId: number;
  public textHeader: string;
  public text: string;
  public author: AuthorModel;
  public parentText: TextModel;
  public childTexts: TextModel[];


  constructor(textId: number, textHeader: string, text: string, author: AuthorModel, parentText: TextModel) {
    this.textId = textId;
    this.textHeader = textHeader;
    this.text = text;
    this.author = author;
    this.parentText = parentText;
    this.childTexts = [];
  }
}
