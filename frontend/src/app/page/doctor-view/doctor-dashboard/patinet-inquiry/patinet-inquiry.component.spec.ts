import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatinetInquiryComponent } from './patinet-inquiry.component';

describe('PatinetInquiryComponent', () => {
  let component: PatinetInquiryComponent;
  let fixture: ComponentFixture<PatinetInquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatinetInquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatinetInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
