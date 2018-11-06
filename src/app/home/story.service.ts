import { Injectable } from '@angular/core';
import {StoryTreeModel} from '../shared/models/story-tree.model';
import {ProfileService} from '../profile/profile.service';
import {TextService} from '../story/text.service';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private story: StoryTreeModel = new StoryTreeModel(1,
    'Lorem ipsum', 'short summary of the story if needed',
    this.profileService.getUserAuthor(1),
    'http://blogs.ft.com/photo-diary/files/2014/02/PB33356971.jpg',
    this.textService.getRootText(1));
  constructor(private profileService: ProfileService, private textService: TextService) {}

  getStoryById(storyId: number): StoryTreeModel {
    return this.story;
  }
}
