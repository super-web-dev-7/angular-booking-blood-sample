import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMedicalComponent } from './modal-medical.component';

describe('ModalMedicalComponent', () => {
  let component: ModalMedicalComponent;
  let fixture: ComponentFixture<ModalMedicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMedicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
