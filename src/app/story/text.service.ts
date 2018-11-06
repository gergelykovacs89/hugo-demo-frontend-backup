import { Injectable } from '@angular/core';
import {TextModel} from '../shared/models/text.model';
import {ProfileService} from '../profile/profile.service';

@Injectable({
  providedIn: 'root'
})
export class TextService {
  private rootText: TextModel = new TextModel(1,
    'First page',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    this.profileService.getUserAuthor(1), null);
  constructor(private profileService: ProfileService) { }

  getRootText(storyId: number): TextModel {
    return this.rootText;
  }
}
