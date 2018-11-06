import { StoryModule } from './story.module';

describe('StoryModule', () => {
  let storyModule: StoryModule;

  beforeEach(() => {
    storyModule = new StoryModule();
  });

  it('should create an instance', () => {
    expect(storyModule).toBeTruthy();
  });
});
