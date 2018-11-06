import { Injectable } from '@angular/core';
import {AuthorModel} from '../shared/models/author.model';
import {UserService} from './user.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public selectedAuthorSub = new Subject<AuthorModel>();
  constructor(private userService: UserService) { }

  public selectedAuthor: AuthorModel;

  private userAuthors: AuthorModel[] = [
    new AuthorModel(1, 'https://f4.bcbits.com/img/a1365259373_10.jpg', 'Optimista üzemlakatos', this.userService.getUser(),
      'halvanyretek'),
    new AuthorModel(2, 'https://i.kym-cdn.com/photos/images/original/000/482/848/a06.png', '“Dude, sucking at sumthin’ is the first step towards being sorta good at something.”', this.userService.getUser(),
      'dömdödöm'),
    new AuthorModel(3, 'https://lomioes.com/wp-content/uploads/2017/10/big-mouth-temporada-2-netflix.jpg', '“Dude, sucking at sumthin’ is the first step towards being sorta good at something.”', this.userService.getUser(),
      'nick'),
    new AuthorModel(4, 'https://images.fatherly.com/wp-content/uploads/2017/09/hormone-monster-1.jpg', '“Dude, sucking at sumthin’ is the first step towards being sorta good at something.”', this.userService.getUser(),
      'hormone monster'),
    new AuthorModel(5, 'https://pbs.twimg.com/profile_images/940930305984262144/at8wC1EL_400x400.jpg', '“Dude, sucking at sumthin’ is the first step towards being sorta good at something.”', this.userService.getUser(),
      'coach steve')
  ];

  private anotherAuthor: AuthorModel = new AuthorModel(2, 'https://i.kym-cdn.com/photos/images/original/000/482/848/a06.png', '“Dude, sucking at sumthin’ is the first step towards being sorta good at something.”', this.userService.getUser2(),
      'dömdödöm');

  getUserAuthors(): AuthorModel[] {
    return this.userAuthors.slice();
  }

  isProfileSelected(): boolean {
    return this.selectedAuthor != null;
  }

  getUserAuthor(id: number): AuthorModel {
    return this.userAuthors.find(a => a.id === id);
  }

  addUserAuthor(author: AuthorModel) {
    this.userAuthors.push(author);
  }

  deleteUserAuthor(id: number) {
    const index: number = this.userAuthors.indexOf(this.getUserAuthor(id), 0);
    if (index > -1) {
      this.userAuthors.splice(index, 1);
    }
  }
}
