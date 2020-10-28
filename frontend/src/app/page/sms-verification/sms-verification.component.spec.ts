import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsVerificationComponent } from './sms-verification.component';

describe('SmsVerificationComponent', () => {
  let component: SmsVerificationComponent;
  let fixture: ComponentFixture<SmsVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
