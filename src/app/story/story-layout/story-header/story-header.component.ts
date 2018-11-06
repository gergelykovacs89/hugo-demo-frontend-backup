import { Component, OnInit } from '@angular/core';
import {StoryTreeModel} from '../../../shared/models/story-tree.model';
import {StoryService} from '../../../home/story.service';

@Component({
  selector: 'app-story-header',
  templateUrl: './story-header.component.html',
  styleUrls: ['./story-header.component.css']
})
export class StoryHeaderComponent implements OnInit {
  private story: StoryTreeModel;
  constructor(private storyService: StoryService) { }

  ngOnInit() {
    this.story = this.storyService.getStoryById(1);
  }

}
