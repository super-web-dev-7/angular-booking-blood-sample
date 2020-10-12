import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnamnesisComponent } from './edit-anamnesis.component';

describe('EditAnamnesisComponent', () => {
  let component: EditAnamnesisComponent;
  let fixture: ComponentFixture<EditAnamnesisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAnamnesisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAnamnesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
