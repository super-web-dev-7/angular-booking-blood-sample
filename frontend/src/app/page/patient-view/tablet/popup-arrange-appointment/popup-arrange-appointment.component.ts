import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-popup-arrange-appointment',
  templateUrl: './popup-arrange-appointment.component.html',
  styleUrls: ['./popup-arrange-appointment.component.scss']
})
export class PopupArrangeAppointmentComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  appointmentForm: FormGroup;
  packages = [
    {id: 1, name: 'Package1'},
    {id: 2, name: 'Package2'},
  ];
  selectedPackage = null;
  isValid = false;
  constructor(
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.appointmentForm = this.formBuilder.group({
      zipcode: ['', Validators.required],
    });
  }

  close = () => {
    this.closeSide.emit(false);
  }

  selectPackage = (id) => {
    this.selectedPackage = id;
  }

}
