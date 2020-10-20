import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorHeaderComponent } from './doctor-header.component';

describe('DoctorHeaderComponent', () => {
  let component: DoctorHeaderComponent;
  let fixture: ComponentFixture<DoctorHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
