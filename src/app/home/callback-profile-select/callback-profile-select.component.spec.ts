import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallbackProfileSelectComponent } from './callback-profile-select.component';

describe('CallbackProfileSelectComponent', () => {
  let component: CallbackProfileSelectComponent;
  let fixture: ComponentFixture<CallbackProfileSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallbackProfileSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallbackProfileSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
