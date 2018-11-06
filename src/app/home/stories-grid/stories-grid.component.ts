import {Component, Input, OnInit} from '@angular/core';
import {StoryTreeModel} from '../../shared/models/story-tree.model';
import {StoryService} from '../story.service';

@Component({
  selector: 'app-stories-grid',
  templateUrl: './stories-grid.component.html',
  styleUrls: ['./stories-grid.component.css']
})
export class StoriesGridComponent implements OnInit {
  @Input()
  index: number;

  private stories: StoryTreeModel[] = [];
  constructor(private storyService: StoryService) { }

  ngOnInit() {
    this.stories.push(this.storyService.getStoryById(1));
    this.stories.push(this.storyService.getStoryById(1));
    this.stories.push(this.storyService.getStoryById(1));
    this.stories.push(this.storyService.getStoryById(1));
    this.stories.push(this.storyService.getStoryById(1));
    this.stories.push(this.storyService.getStoryById(1));
    this.stories.push(this.storyService.getStoryById(1));

    this.stories.push(this.storyService.getStoryById(1));
    this.stories.push(this.storyService.getStoryById(1));
    this.stories.push(this.storyService.getStoryById(1));
    this.stories.push(this.storyService.getStoryById(1));
  }

  getStories(): StoryTreeModel[] {
    return this.stories.slice();
  }

}
