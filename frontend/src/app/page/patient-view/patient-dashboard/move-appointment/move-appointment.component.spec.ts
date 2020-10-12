import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveAppointmentComponent } from './move-appointment.component';

describe('MoveAppointmentComponent', () => {
  let component: MoveAppointmentComponent;
  let fixture: ComponentFixture<MoveAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
