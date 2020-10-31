import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingTimePickerComponent } from './booking-time-picker.component';

describe('BookingTimePickerComponent', () => {
  let component: BookingTimePickerComponent;
  let fixture: ComponentFixture<BookingTimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingTimePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
