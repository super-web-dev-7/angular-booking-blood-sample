import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePatientInquiryComponent } from './side-patient-inquiry.component';

describe('SidePatientInquiryComponent', () => {
  let component: SidePatientInquiryComponent;
  let fixture: ComponentFixture<SidePatientInquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidePatientInquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidePatientInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
