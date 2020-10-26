import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SharedService} from '../../../../service/shared/shared.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {HttpService} from '../../../../service/http/http.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {URL_JSON} from '../../../../utils/url_json';
import * as moment from 'moment';

@Component({
  selector: 'app-answer-inquiry',
  templateUrl: './answer-inquiry.component.html',
  styleUrls: ['./answer-inquiry.component.scss']
})
export class AnswerInquiryComponent implements OnInit {
   isContactHistory = false;
   isMedicalHistory = false;
   isPatientCall = false;
   content = null;
   Editor = ClassicEditor;
   messageForm: FormGroup;
   displayData: any;
   isSent = false;
  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AnswerInquiryComponent>,
    private sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public httpService: HttpService,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      message: [null, Validators.required]
    });
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentWithCallbackById/' + this.data.appointmentId).subscribe((res: any) => {
      this.displayData = res;
    });
    this.sharedService.closeHistory.subscribe(res => {
      this.isMedicalHistory = false;
      this.isContactHistory = false;
      this.isPatientCall = false;
    });
  }

  getTimeDuration = (startTime, duration) => {
    if (!startTime || !duration) {
      return '';
    }
    return moment(startTime).format('DD.MM.YYYY HH:mm') + ' - ' + moment(startTime + duration * 60 * 1000).format('HH:mm');
  }

  formatTime = (time) => {
    return moment(time).format('DD.MM.YYYY HH:mm');
  }

  get f(): any {
    return this.messageForm.controls;
  }

  sendMessage = () => {
    if (this.messageForm.invalid) {
      return;
    }
    const data = {
      callbackId: this.displayData.id,
      answer: this.f.message.value,
    };
    if (data) {
      this.httpService.post(URL_JSON.DOCTOR + '/sendMessageToPatientAboutCallback', data).subscribe((res: any) => {
        if (res) {
          this.isSent = true;
        }
      });
    }
  }

  submit = () => {
    if (this.messageForm.invalid) {
      return;
    }
    this.httpService.update(URL_JSON.DOCTOR + '/inquiryAnswered/' + this.displayData.appointmentId, {}).subscribe((res: any) => {
      if (res) {
        this.dialogRef.close(true);
      }
    });
  }

  close = () => {
    this.dialogRef.close();
  }

  archive = () => {
    this.httpService.update(URL_JSON.DOCTOR + '/setAppointmentToArchive/' + this.displayData.appointmentId, {}).subscribe(res => {
      console.log(res);
    });
  }

  afterClosed = (dialogRef) => {
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openMedicalHistory = () => {
    this.isMedicalHistory = true;
    this.isContactHistory = false;
    const emitData = {
      title: 'medical',
      data: this.data
    };
    this.sharedService.answer.emit(emitData);
  }

  openContactHistory = () => {
    this.isContactHistory = true;
    this.isMedicalHistory = false;
    const emitData = {
      title: 'contact',
      data: {
        appointmentId: this.displayData.appointmentId,
        callbackId: this.displayData.id
      }
    };
    this.sharedService.answer.emit(emitData);
  }

  openPatientCall = () => {
    this.isMedicalHistory = false;
    this.isContactHistory = false;
    const emitData = {
      title: 'call',
      data: {
        appointmentId: this.displayData.appointmentId,
        callbackId: this.displayData.id,
        phoneNumber: this.displayData.phoneNumber,
        firstName: this.displayData.patientFirstName,
        lastName: this.displayData.patientLastName,
        question: false
      }
    };
    this.sharedService.answer.emit(emitData);
  }

}
