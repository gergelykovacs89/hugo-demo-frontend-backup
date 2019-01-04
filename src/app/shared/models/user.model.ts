import {AuthorModel} from './author.model';

export class UserModel {
  private _id: number;
  private _name: string;
  private _email: string;
  private _aliases: AuthorModel[] = [];
  private password: string;


  constructor(id: number, name: string, email: string, password: string) {
    this._id = id;
    this._name = name;
    this._email = email;
    this.password = password;
  }


  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get aliases(): AuthorModel[] {
    return this._aliases;
  }


  get id(): number {
    return this._id;
  }
}
