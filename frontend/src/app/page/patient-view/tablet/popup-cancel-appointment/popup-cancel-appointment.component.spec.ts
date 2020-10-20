import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCancelAppointmentComponent } from './popup-cancel-appointment.component';

describe('PopupCancelAppointmentComponent', () => {
  let component: PopupCancelAppointmentComponent;
  let fixture: ComponentFixture<PopupCancelAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupCancelAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCancelAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
