import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnamnesReleaseComponent } from './anamnes-release.component';

describe('AnamnesReleaseComponent', () => {
  let component: AnamnesReleaseComponent;
  let fixture: ComponentFixture<AnamnesReleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnamnesReleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnamnesReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
