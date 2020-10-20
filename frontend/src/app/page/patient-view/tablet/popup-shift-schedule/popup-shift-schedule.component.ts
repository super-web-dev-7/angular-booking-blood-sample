import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-popup-shift-schedule',
  templateUrl: './popup-shift-schedule.component.html',
  styleUrls: ['./popup-shift-schedule.component.scss']
})
export class PopupShiftScheduleComponent implements OnInit {
  moveForm: FormGroup;
  @Input() isMobile;
  @Input() isTablet;

  @Output() closeSide = new EventEmitter();
  constructor(
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.moveForm = this.formBuilder.group({
      zipcode: [''],
      place: [''],
      street: [''],
      message: ['']
    });
  }

  get f(): any {
    return this.moveForm.controls;
  }

  close = () => {
    this.closeSide.emit(false);
  }

}
