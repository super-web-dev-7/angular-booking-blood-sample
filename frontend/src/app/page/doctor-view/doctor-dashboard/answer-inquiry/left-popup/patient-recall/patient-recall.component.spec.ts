import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRecallComponent } from './patient-recall.component';

describe('PatientRecallComponent', () => {
  let component: PatientRecallComponent;
  let fixture: ComponentFixture<PatientRecallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientRecallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientRecallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
