import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderIconComponent } from './order-icon.component';

describe('OrderIconComponent', () => {
  let component: OrderIconComponent;
  let fixture: ComponentFixture<OrderIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
