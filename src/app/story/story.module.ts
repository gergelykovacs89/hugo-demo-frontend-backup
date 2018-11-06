import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryLayoutComponent } from './story-layout/story-layout.component';
import { StoryHeaderComponent } from './story-layout/story-header/story-header.component';
import { UnfoldingTextComponent } from './story-layout/unfolding-text/unfolding-text.component';
import { TextComponent } from './story-layout/unfolding-text/text/text.component';
import { NewTextComponent } from './story-layout/unfolding-text/new-text/new-text.component';
import { NewStoryComponent } from './new-story/new-story.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [StoryLayoutComponent, StoryHeaderComponent, UnfoldingTextComponent, TextComponent, NewTextComponent, NewStoryComponent]
})
export class StoryModule { }
