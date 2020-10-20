import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentHistoryComponent } from './appointment-history.component';

describe('AppointmentHistoryComponent', () => {
  let component: AppointmentHistoryComponent;
  let fixture: ComponentFixture<AppointmentHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
