import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCallSisterComponent } from './popup-call-sister.component';

describe('PopupCallSisterComponent', () => {
  let component: PopupCallSisterComponent;
  let fixture: ComponentFixture<PopupCallSisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupCallSisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCallSisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
