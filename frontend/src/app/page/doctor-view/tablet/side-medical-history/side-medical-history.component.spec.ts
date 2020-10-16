import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMedicalHistoryComponent } from './side-medical-history.component';

describe('SideMedicalHistoryComponent', () => {
  let component: SideMedicalHistoryComponent;
  let fixture: ComponentFixture<SideMedicalHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideMedicalHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMedicalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
