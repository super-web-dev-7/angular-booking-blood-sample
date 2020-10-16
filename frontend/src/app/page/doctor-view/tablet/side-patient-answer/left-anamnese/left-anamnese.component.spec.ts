import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftAnamneseComponent } from './left-anamnese.component';

describe('LeftAnamneseComponent', () => {
  let component: LeftAnamneseComponent;
  let fixture: ComponentFixture<LeftAnamneseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftAnamneseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftAnamneseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
