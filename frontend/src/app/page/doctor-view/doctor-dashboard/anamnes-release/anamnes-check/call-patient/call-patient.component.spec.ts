import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallPatientComponent } from './call-patient.component';

describe('CallPatientComponent', () => {
  let component: CallPatientComponent;
  let fixture: ComponentFixture<CallPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
