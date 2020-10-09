import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivePatientComponent } from './archive-patient.component';

describe('ArchivePatientComponent', () => {
  let component: ArchivePatientComponent;
  let fixture: ComponentFixture<ArchivePatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivePatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
