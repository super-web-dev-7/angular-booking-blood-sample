import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnamnesCheckComponent } from './anamnes-check.component';

describe('AnamnesCheckComponent', () => {
  let component: AnamnesCheckComponent;
  let fixture: ComponentFixture<AnamnesCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnamnesCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnamnesCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
