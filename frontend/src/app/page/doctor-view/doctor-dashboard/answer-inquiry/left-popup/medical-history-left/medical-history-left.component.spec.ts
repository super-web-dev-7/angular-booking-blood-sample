import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalHistoryLeftComponent } from './medical-history-left.component';

describe('MedicalHistoryLeftComponent', () => {
  let component: MedicalHistoryLeftComponent;
  let fixture: ComponentFixture<MedicalHistoryLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalHistoryLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalHistoryLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
