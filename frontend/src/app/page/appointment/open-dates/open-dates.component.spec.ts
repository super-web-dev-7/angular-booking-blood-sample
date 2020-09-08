import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenDatesComponent } from './open-dates.component';

describe('OpenDatesComponent', () => {
  let component: OpenDatesComponent;
  let fixture: ComponentFixture<OpenDatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenDatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
