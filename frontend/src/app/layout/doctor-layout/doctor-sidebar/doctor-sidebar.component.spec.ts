import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSidebarComponent } from './doctor-sidebar.component';

describe('DoctorSidebarComponent', () => {
  let component: DoctorSidebarComponent;
  let fixture: ComponentFixture<DoctorSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
