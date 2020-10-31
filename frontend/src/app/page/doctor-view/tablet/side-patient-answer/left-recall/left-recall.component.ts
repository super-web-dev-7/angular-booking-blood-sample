import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SharedService} from '../../../../../service/shared/shared.service';
import {HttpService} from '../../../../../service/http/http.service';
import {URL_JSON} from '../../../../../utils/url_json';

@Component({
  selector: 'app-left-recall',
  templateUrl: './left-recall.component.html',
  styleUrls: ['./left-recall.component.scss']
})
export class LeftRecallComponent implements OnInit {
  @Input() callbackInfo;
  PatientCallForm: FormGroup;
  constructor(
    private sharedService: SharedService,
    public formBuilder: FormBuilder,
    public httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this.PatientCallForm = this.formBuilder.group({
      title: [null, Validators.required],
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
      callbackId: this.callbackInfo.callbackId,
      message: this.f.message.value,
      appointmentId: this.callbackInfo.appointmentId,
      title: this.f.title.value,
      phoneNumber: this.callbackInfo.phoneNumber,
      patientNotThere: this.f.patient.value,
    };
    if (this.callbackInfo.question) {

    } else {
      this.httpService.post(URL_JSON.DOCTOR + '/createPatientRecall', data).subscribe((res: any) => {
        if (res) {
          this.close();
        }
      });
    }
  }
}
