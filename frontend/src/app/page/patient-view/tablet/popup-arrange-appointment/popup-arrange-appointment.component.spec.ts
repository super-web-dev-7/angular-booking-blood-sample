import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupArrangeAppointmentComponent } from './popup-arrange-appointment.component';

describe('PopupArrangeAppointmentComponent', () => {
  let component: PopupArrangeAppointmentComponent;
  let fixture: ComponentFixture<PopupArrangeAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupArrangeAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupArrangeAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
