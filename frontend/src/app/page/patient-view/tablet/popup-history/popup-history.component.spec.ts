import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupHistoryComponent } from './popup-history.component';

describe('PopupHistoryComponent', () => {
  let component: PopupHistoryComponent;
  let fixture: ComponentFixture<PopupHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
