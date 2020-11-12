import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import {HttpService} from '../../service/http/http.service';
import {URL_JSON} from '../../utils/url_json';

@Component({
  selector: 'app-booking-layout',
  templateUrl: './booking-layout.component.html',
  styleUrls: ['./booking-layout.component.scss']
})
export class BookingLayoutComponent implements OnInit {

  currentStep = 1;
  zipcode = null;
  zipcodeModel;
  selectedPackage = null;
  selectedAdditionalPackage = null;
  bookingTime = null;
  duration = null;
  patient = null;
  message = null;
  appointment = null;
  constructor(
    public route: ActivatedRoute,
    public httpService: HttpService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.zipcode = params.zipCode;
    });
  }

  setZipCode = zipCodeModel => {
    this.zipcode = zipCodeModel.zipcode;
    this.zipcodeModel = zipCodeModel;
    this.currentStep++;
  }

  setBookingData = data => {
    this.selectedPackage = data.package;
    this.selectedAdditionalPackage = data.additionalPackage;
    this.bookingTime = data.time;
    this.duration = data.duration;
    this.currentStep++;
  }

  deselect = deselect => {
    if (deselect.type === 'package') {
      this.selectedPackage = null;
    } else {
      this.selectedAdditionalPackage = null;
    }
    this.currentStep--;
  }

  setPatientData = data => {
    console.log(data);
    this.patient = data.patient;
    this.message = data.message;
    this.httpService.create(URL_JSON.USER + '/patient', data.patient).subscribe((res1: any) => {
      console.log('response of patient register >>>>>>>>>>> ', res1);
      const appointmentData = {
        packageId: this.selectedPackage.id,
        additionalPackageId: this.selectedAdditionalPackage.id,
        time: this.bookingTime,
        plz: this.zipcodeModel.zipcode,
        ort: this.zipcodeModel.street,
        payment: this.patient.alternative ? 'alternative' : 'customerStore',
        message: this.message.message,
        userId: res1.user.id
      };
      this.httpService.post(URL_JSON.APPOINTMENT + '/create_by_patient', appointmentData).subscribe((res2: any) => {
        if (res2) {
          if (res2.message === 'success') {
            this.appointment = res2.newAppointment;
            this.currentStep++;
          }
        }
        console.log(res2);
      });
    }, () => {
      this.snackBar.open('Dieser User ist bereits im System vorhanden.', '', {duration: 2000});
    });
  }

}
