import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentNewComponent } from './appointment-new.component';

describe('AppointmentNewComponent', () => {
  let component: AppointmentNewComponent;
  let fixture: ComponentFixture<AppointmentNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
