import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupChangePackageComponent } from './popup-change-package.component';

describe('PopupChangePackageComponent', () => {
  let component: PopupChangePackageComponent;
  let fixture: ComponentFixture<PopupChangePackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupChangePackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupChangePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
