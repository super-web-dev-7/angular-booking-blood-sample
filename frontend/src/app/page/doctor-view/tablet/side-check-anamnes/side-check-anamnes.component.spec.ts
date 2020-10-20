import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideCheckAnamnesComponent } from './side-check-anamnes.component';

describe('SideCheckAnamnesComponent', () => {
  let component: SideCheckAnamnesComponent;
  let fixture: ComponentFixture<SideCheckAnamnesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideCheckAnamnesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideCheckAnamnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
