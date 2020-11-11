import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingStepThirdComponent } from './booking-step-third.component';

describe('BookingStepThirdComponent', () => {
  let component: BookingStepThirdComponent;
  let fixture: ComponentFixture<BookingStepThirdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingStepThirdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingStepThirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
