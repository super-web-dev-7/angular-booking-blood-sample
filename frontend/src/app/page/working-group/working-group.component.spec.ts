import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingGroupComponent } from './working-group.component';

describe('WorkingGroupComponent', () => {
  let component: WorkingGroupComponent;
  let fixture: ComponentFixture<WorkingGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
