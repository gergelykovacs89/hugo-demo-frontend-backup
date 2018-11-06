import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryLayoutComponent } from './story-layout.component';

describe('StoryLayoutComponent', () => {
  let component: StoryLayoutComponent;
  let fixture: ComponentFixture<StoryLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
