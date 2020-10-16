import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftHistoryPopupComponent } from './left-history-popup.component';

describe('LeftHistoryPopupComponent', () => {
  let component: LeftHistoryPopupComponent;
  let fixture: ComponentFixture<LeftHistoryPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftHistoryPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftHistoryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
