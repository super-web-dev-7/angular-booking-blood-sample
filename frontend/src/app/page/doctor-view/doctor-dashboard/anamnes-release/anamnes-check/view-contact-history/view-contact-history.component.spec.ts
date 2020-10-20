import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContactHistoryComponent } from './view-contact-history.component';

describe('ViewContactHistoryComponent', () => {
  let component: ViewContactHistoryComponent;
  let fixture: ComponentFixture<ViewContactHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewContactHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewContactHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
