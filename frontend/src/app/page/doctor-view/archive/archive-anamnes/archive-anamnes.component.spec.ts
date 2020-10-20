import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveAnamnesComponent } from './archive-anamnes.component';

describe('ArchiveAnamnesComponent', () => {
  let component: ArchiveAnamnesComponent;
  let fixture: ComponentFixture<ArchiveAnamnesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveAnamnesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveAnamnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
