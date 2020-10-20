import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallbackDoctorComponent } from './callback-doctor.component';

describe('CallbackDoctorComponent', () => {
  let component: CallbackDoctorComponent;
  let fixture: ComponentFixture<CallbackDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallbackDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallbackDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
