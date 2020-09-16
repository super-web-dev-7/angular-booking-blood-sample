import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAdditionalComponent } from './new-additional.component';

describe('NewAdditionalComponent', () => {
  let component: NewAdditionalComponent;
  let fixture: ComponentFixture<NewAdditionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAdditionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAdditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
