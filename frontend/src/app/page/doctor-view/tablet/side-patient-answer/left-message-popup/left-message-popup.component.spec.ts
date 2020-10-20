import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftMessagePopupComponent } from './left-message-popup.component';

describe('LeftMessagePopupComponent', () => {
  let component: LeftMessagePopupComponent;
  let fixture: ComponentFixture<LeftMessagePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftMessagePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftMessagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
