import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEditAnamnesComponent } from './popup-edit-anamnes.component';

describe('PopupEditAnamnesComponent', () => {
  let component: PopupEditAnamnesComponent;
  let fixture: ComponentFixture<PopupEditAnamnesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupEditAnamnesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupEditAnamnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
