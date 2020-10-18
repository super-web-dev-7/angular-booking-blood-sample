import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-popup-cancel-appointment',
  templateUrl: './popup-cancel-appointment.component.html',
  styleUrls: ['./popup-cancel-appointment.component.scss']
})
export class PopupCancelAppointmentComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  cancelForm: FormGroup;
  showMessage: boolean;
  success = false;
  constructor(
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.showMessage = false;
    this.cancelForm = this.formBuilder.group({
      message: ['']
    });
  }

  close = () => {
    this.closeSide.emit(false);
  }

  openMessage = () => {
    this.showMessage = !this.showMessage;
  }

  submit = () => {
    this.success = true;
  }

  get f(): any {
    return this.cancelForm.controls;
  }

}
