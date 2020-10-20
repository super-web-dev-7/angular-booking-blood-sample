import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupNewAppointmentComponent } from './popup-new-appointment.component';

describe('PopupNewAppointmentComponent', () => {
  let component: PopupNewAppointmentComponent;
  let fixture: ComponentFixture<PopupNewAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupNewAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupNewAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
