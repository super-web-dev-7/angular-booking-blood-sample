import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalQuestionShowComponent } from './medical-question-show.component';

describe('MedicalQuestionShowComponent', () => {
  let component: MedicalQuestionShowComponent;
  let fixture: ComponentFixture<MedicalQuestionShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalQuestionShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalQuestionShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
