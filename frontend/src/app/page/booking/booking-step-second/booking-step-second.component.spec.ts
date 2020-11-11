import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingStepSecondComponent } from './booking-step-second.component';

describe('BookingStepSecondComponent', () => {
  let component: BookingStepSecondComponent;
  let fixture: ComponentFixture<BookingStepSecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingStepSecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingStepSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
