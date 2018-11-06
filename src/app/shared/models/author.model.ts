import {StoryTreeModel} from './story-tree.model';
import {TextModel} from './text.model';
import {UserModel} from './user.model';

export class AuthorModel {
  public id: number;
  public imgPath: string;
  public description: string;
  private user: UserModel;
  public name: string;
  public stories: StoryTreeModel[] = [];
  public texts: TextModel[] = [];
  public following: AuthorModel[] = [];
  public followers: AuthorModel[] = [];


  constructor(id: number, imgPath: string, description: string, user: UserModel, name: string) {
    this.id = id;
    this.imgPath = imgPath;
    this.description = description;
    this.user = user;
    this.name = name;
  }

  getUser(): UserModel {
    return this.user;
  }

  addFollower(authorToFollow: AuthorModel) {
  }
}
