import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingStepFirstComponent } from './booking-step-first.component';

describe('BookingStepFirstComponent', () => {
  let component: BookingStepFirstComponent;
  let fixture: ComponentFixture<BookingStepFirstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingStepFirstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingStepFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
