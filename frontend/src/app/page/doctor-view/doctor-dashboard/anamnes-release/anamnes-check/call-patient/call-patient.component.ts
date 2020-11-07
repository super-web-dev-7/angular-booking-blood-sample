import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SharedService} from '../../../../../../service/shared/shared.service';
import {HttpService} from '../../../../../../service/http/http.service';
import {URL_JSON} from '../../../../../../utils/url_json';

@Component({
  selector: 'app-call-patient',
  templateUrl: './call-patient.component.html',
  styleUrls: ['./call-patient.component.scss']
})
export class CallPatientComponent implements OnInit {
  PatientCallForm: FormGroup;
  @Input() callbackData;
  constructor(
    private sharedService: SharedService,
    public formBuilder: FormBuilder,
    public httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.PatientCallForm = this.formBuilder.group({
      title: [null, Validators.required],
      message: [null],
      patient: [null, Validators.required]
    });
  }

  get f(): any {
    return this.PatientCallForm.controls;
  }

  close = () => {
    this.sharedService.closeHistory.emit('call');
  }

  submit = () => {
    if (this.PatientCallForm.invalid) {
      return;
    }
    const data = {
      callbackId: this.callbackData.callbackId,
      message: this.f.message.value,
      appointmentId: this.callbackData.appointmentId,
      title: this.f.title.value,
      phoneNumber: this.callbackData.phoneNumber,
      patientNotThere: this.f.patient.value,
    };

    this.httpService.post(URL_JSON.DOCTOR + '/createPatientRecall', data).subscribe((res: any) => {
      if (res) {
        this.close();
      }
    });
  }
}
