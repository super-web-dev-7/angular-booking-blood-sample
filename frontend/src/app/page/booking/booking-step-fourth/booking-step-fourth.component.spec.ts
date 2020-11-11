import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingStepFourthComponent } from './booking-step-fourth.component';

describe('BookingStepFourthComponent', () => {
  let component: BookingStepFourthComponent;
  let fixture: ComponentFixture<BookingStepFourthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingStepFourthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingStepFourthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
