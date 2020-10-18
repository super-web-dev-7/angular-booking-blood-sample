import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientLeftSidebarComponent } from './patient-left-sidebar.component';

describe('PatientLeftSidebarComponent', () => {
  let component: PatientLeftSidebarComponent;
  let fixture: ComponentFixture<PatientLeftSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientLeftSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientLeftSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
