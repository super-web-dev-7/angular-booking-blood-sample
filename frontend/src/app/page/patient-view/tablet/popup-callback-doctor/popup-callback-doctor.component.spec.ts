import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCallbackDoctorComponent } from './popup-callback-doctor.component';

describe('PopupCallbackDoctorComponent', () => {
  let component: PopupCallbackDoctorComponent;
  let fixture: ComponentFixture<PopupCallbackDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupCallbackDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCallbackDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
