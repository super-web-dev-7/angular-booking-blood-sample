import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewAdditionalComponent } from './overview-additional.component';

describe('OverviewAdditionalComponent', () => {
  let component: OverviewAdditionalComponent;
  let fixture: ComponentFixture<OverviewAdditionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewAdditionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewAdditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
