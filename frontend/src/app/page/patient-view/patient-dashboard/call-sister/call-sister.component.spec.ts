import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallSisterComponent } from './call-sister.component';

describe('CallSisterComponent', () => {
  let component: CallSisterComponent;
  let fixture: ComponentFixture<CallSisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallSisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallSisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
