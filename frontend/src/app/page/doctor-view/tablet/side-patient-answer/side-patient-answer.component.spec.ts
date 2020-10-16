import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePatientAnswerComponent } from './side-patient-answer.component';

describe('SidePatientAnswerComponent', () => {
  let component: SidePatientAnswerComponent;
  let fixture: ComponentFixture<SidePatientAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidePatientAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidePatientAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
