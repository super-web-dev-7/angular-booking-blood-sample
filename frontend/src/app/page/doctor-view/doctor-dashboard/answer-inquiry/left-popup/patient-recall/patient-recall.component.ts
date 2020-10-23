import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from '../../../../../../service/shared/shared.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../../../../../service/http/http.service';
import {URL_JSON} from '../../../../../../utils/url_json';

@Component({
  selector: 'app-patient-recall',
  templateUrl: './patient-recall.component.html',
  styleUrls: ['./patient-recall.component.scss']
})
export class PatientRecallComponent implements OnInit {
  PatientCallForm: FormGroup;
  @Input() callbackData;
  constructor(
    private sharedService: SharedService,
    public formBuilder: FormBuilder,
    public httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.PatientCallForm = this.formBuilder.group({
      time: [null, Validators.required],
      message: [null, Validators.required],
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
      time: this.f.time.value?.toLocaleString(),
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
