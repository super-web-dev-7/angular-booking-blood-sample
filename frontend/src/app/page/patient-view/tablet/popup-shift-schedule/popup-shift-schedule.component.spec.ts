import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupShiftScheduleComponent } from './popup-shift-schedule.component';

describe('PopupShiftScheduleComponent', () => {
  let component: PopupShiftScheduleComponent;
  let fixture: ComponentFixture<PopupShiftScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupShiftScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupShiftScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
