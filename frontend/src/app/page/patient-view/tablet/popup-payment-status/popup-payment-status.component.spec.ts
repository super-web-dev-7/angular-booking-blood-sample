import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPaymentStatusComponent } from './popup-payment-status.component';

describe('PopupPaymentStatusComponent', () => {
  let component: PopupPaymentStatusComponent;
  let fixture: ComponentFixture<PopupPaymentStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupPaymentStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupPaymentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
