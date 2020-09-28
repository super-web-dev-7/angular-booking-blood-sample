import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentViewComponent } from './appointment-view.component';

describe('AppointmentViewComponent', () => {
  let component: AppointmentViewComponent;
  let fixture: ComponentFixture<AppointmentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
