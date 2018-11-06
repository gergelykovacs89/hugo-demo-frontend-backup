import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoriesGridComponent } from './stories-grid.component';

describe('StoriesGridComponent', () => {
  let component: StoriesGridComponent;
  let fixture: ComponentFixture<StoriesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoriesGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoriesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
