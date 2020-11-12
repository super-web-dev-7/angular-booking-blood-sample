import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {HttpService} from '../../../service/http/http.service';

@Component({
  selector: 'app-booking-step-first',
  templateUrl: './booking-step-first.component.html',
  styleUrls: ['./booking-step-first.component.scss']
})
export class BookingStepFirstComponent implements OnInit {
  zipcodeForm: FormGroup;
  @Input() zipcode;
  @Output() setZipCode = new EventEmitter();
  zipcodeModel;
  constructor(
    public formBuilder: FormBuilder,
    public httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.zipcodeForm = this.formBuilder.group({
      plz: [this.zipcode, Validators.required],
    });
    this.checkPostalCode();
  }

  get f(): any {
    return this.zipcodeForm.controls;
  }

  checkPostalCode = () => {
    this.httpService.checkPostalCodeForAppointment(this.f.plz.value).subscribe((res: any) => {
      if (!res) {
        this.f.plz.setErrors(Validators.required);
      } else {
        this.f.plz.setErrors(null);
        this.zipcodeModel = res;
        // this.city = res.city;
      }
    });
  }

  submit = () => {
    if (this.zipcodeForm.invalid) {
      return;
    }
    console.log(this.f.plz.value);
    this.setZipCode.emit(this.zipcodeModel);
  }
}
