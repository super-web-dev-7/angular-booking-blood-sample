import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnamnesViewComponent } from './anamnes-view.component';

describe('AnamnesViewComponent', () => {
  let component: AnamnesViewComponent;
  let fixture: ComponentFixture<AnamnesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnamnesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnamnesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
