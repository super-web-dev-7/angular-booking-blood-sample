import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideViewAppointmentComponent } from './side-view-appointment.component';

describe('SideViewAppointmentComponent', () => {
  let component: SideViewAppointmentComponent;
  let fixture: ComponentFixture<SideViewAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideViewAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideViewAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
