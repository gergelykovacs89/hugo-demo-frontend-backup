import {Injectable} from '@angular/core';
import {StoryTreeModel} from '../shared/models/story-tree.model';
import {ProfileService} from '../profile/profile.service';
import {TextService} from '../story/text.service';
import {AuthorModel} from '../shared/models/author.model';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private story: StoryTreeModel = new StoryTreeModel(1,
    'Lorem ipsum', 'short summary of the story if needed',
    new AuthorModel('https://f4.bcbits.com/img/a1365259373_10.jpg', 'optimista üzemlakatos', 'halvanyretek', 'dumniiidd'),
    'http://blogs.ft.com/photo-diary/files/2014/02/PB33356971.jpg',
    this.textService.getRootText(1));
  constructor(private profileService: ProfileService, private textService: TextService) {}

  getStoryById(storyId: number): StoryTreeModel {
    return this.story;
  }
}
