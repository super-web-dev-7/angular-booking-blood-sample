import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveEventComponent } from './archive-event.component';

describe('ArchiveEventComponent', () => {
  let component: ArchiveEventComponent;
  let fixture: ComponentFixture<ArchiveEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
