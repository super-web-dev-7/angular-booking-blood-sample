import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactHistoryLeftComponent } from './contact-history-left.component';

describe('ContactHistoryLeftComponent', () => {
  let component: ContactHistoryLeftComponent;
  let fixture: ComponentFixture<ContactHistoryLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactHistoryLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactHistoryLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
