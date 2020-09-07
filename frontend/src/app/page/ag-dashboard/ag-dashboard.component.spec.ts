import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgDashboardComponent } from './ag-dashboard.component';

describe('AgDashboardComponent', () => {
  let component: AgDashboardComponent;
  let fixture: ComponentFixture<AgDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
