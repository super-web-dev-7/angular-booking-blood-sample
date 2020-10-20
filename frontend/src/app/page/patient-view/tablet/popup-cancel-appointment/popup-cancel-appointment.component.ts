import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatDialogRef} from '@angular/material/dialog';

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
  @Input() isMobile;
  @Input() isTablet;
  constructor(
    public formBuilder: FormBuilder,
    public breakpointObserver: BreakpointObserver,
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
