import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as moment from 'moment';

import {SharedService} from '../../../../../service/shared/shared.service';
import {HttpService} from '../../../../../service/http/http.service';
import {URL_JSON} from '../../../../../utils/url_json';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-anamnes-check',
  templateUrl: './anamnes-check.component.html',
  styleUrls: ['./anamnes-check.component.scss']
})
export class AnamnesCheckComponent implements OnInit {
  isCheckContact = false;
  content = null;
  Editor = ClassicEditor;
  displayData: any;
  messageForm: FormGroup;
  isSent = false;

  constructor(
    private sharedService: SharedService,
    public httpService: HttpService,
    private dialogRef: MatDialogRef<AnamnesCheckComponent>,
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      message: [null, Validators.required]
    });
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentWithQuestionById/' + this.data.appointmentId).subscribe((res: any) => {
      this.displayData = res[0];
    });
    this.sharedService.closeHistory.subscribe(res => {
      this.isCheckContact = false;
    });
  }

  get f(): any {
    return this.messageForm.controls;
  }

  getTimeDuration = (startTime, duration) => {
    if (!startTime || !duration) {
      return '';
    }
    return moment(startTime).format('DD.MM.YYYY HH:mm') + ' - ' + moment(startTime + duration * 60 * 1000).format('HH:mm');
  }

  sendMessage = () => {
    if (this.messageForm.invalid) {
      return;
    }
    const data = {
      questionId: this.displayData.id,
      answer: this.f.message.value,
      appointmentId: this.displayData.appointmentId
    };
    if (data) {
      this.httpService.post(URL_JSON.DOCTOR + '/sendMessageToPatient', data).subscribe((res: any) => {
        if (res) {
          this.isSent = true;
        }
      });
    }
  }

  release = () => {
    if (!this.isSent) {
      return;
    }
    this.httpService.update(URL_JSON.DOCTOR + '/releaseAppointment/' + this.displayData.appointmentId, {}).subscribe((res: any) => {
      if (res) {
        this.dialogRef.close(true);
      }
    });
  }

  cancel = () => {
    this.httpService.update(URL_JSON.DOCTOR + '/cancelAppointment/' + this.displayData.appointmentId, {}).subscribe((res: any) => {
      if (res) {
        this.dialogRef.close(false);
        this.isSent = false;
      }
    });
  }

  archive = () => {
    console.log(this.displayData);
    this.httpService.update(URL_JSON.DOCTOR + '/setAppointmentToArchive/' + this.displayData.appointmentId, {}).subscribe(res => {
      console.log(res);
    });
  }

  openCheckContact = () => {
    this.isCheckContact = true;
    const emitData = {
      title: 'v-contact',
      appointmentId: this.displayData?.appointmentId
    };
    this.sharedService.check.emit(emitData);
  }

  openCallPatient = () => {
    this.isCheckContact = false;
    const emitData = {
      title: 'call-patient',
      appointmentId: this.displayData?.appointmentId
    };
    this.sharedService.check.emit(emitData);
  }

  close = () => {
    this.dialogRef.close();
  }

}
