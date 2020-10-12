import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePackageComponent } from './change-package.component';

describe('ChangePackageComponent', () => {
  let component: ChangePackageComponent;
  let fixture: ComponentFixture<ChangePackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
