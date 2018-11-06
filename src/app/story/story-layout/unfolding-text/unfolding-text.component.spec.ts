import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnfoldingTextComponent } from './unfolding-text.component';

describe('UnfoldingTextComponent', () => {
  let component: UnfoldingTextComponent;
  let fixture: ComponentFixture<UnfoldingTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnfoldingTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnfoldingTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
