import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftRecallComponent } from './left-recall.component';

describe('LeftRecallComponent', () => {
  let component: LeftRecallComponent;
  let fixture: ComponentFixture<LeftRecallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftRecallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftRecallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
