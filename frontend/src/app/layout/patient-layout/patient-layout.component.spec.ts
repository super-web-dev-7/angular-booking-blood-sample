import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientLayoutComponent } from './patient-layout.component';

describe('PatientLayoutComponent', () => {
  let component: PatientLayoutComponent;
  let fixture: ComponentFixture<PatientLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
