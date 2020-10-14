import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidbarPatientComponent } from './sidebar-patient.component';

describe('SidbarPatientComponent', () => {
  let component: SidbarPatientComponent;
  let fixture: ComponentFixture<SidbarPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidbarPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidbarPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
