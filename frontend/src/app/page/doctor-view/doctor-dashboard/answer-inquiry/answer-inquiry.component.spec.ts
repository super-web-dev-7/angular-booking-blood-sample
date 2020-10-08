import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerInquiryComponent } from './answer-inquiry.component';

describe('AnswerInquiryComponent', () => {
  let component: AnswerInquiryComponent;
  let fixture: ComponentFixture<AnswerInquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerInquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
