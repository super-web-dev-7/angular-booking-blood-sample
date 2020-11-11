import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingLayoutComponent } from './booking-layout.component';

describe('BookingLayoutComponent', () => {
  let component: BookingLayoutComponent;
  let fixture: ComponentFixture<BookingLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
