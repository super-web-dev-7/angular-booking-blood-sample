import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
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
  isMobile = false;
  isTablet = false;
  constructor(
    public formBuilder: FormBuilder,
    public breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    this.showMessage = false;
    this.cancelForm = this.formBuilder.group({
      message: ['']
    });
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
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

  @HostListener('window:resize', [])
  private onResize = () => {
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
  }

}
