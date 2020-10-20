import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SharedService} from '../../../../service/shared/shared.service';

@Component({
  selector: 'app-popup-new-appointment',
  templateUrl: './popup-new-appointment.component.html',
  styleUrls: ['./popup-new-appointment.component.scss']
})
export class PopupNewAppointmentComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  appointmentForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.appointmentForm = this.formBuilder.group({
      zipcode: ['', Validators.required],
    });
  }

  close = () => {
    this.closeSide.emit(false);
  }

  arrangeAppointment = () => {
    this.close();
    this.sharedService.patientPopup.emit('arrange');
  }
}
