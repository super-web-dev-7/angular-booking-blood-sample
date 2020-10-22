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
   customText = '';
   content = null;
   Editor = ClassicEditor;
   messageForm: FormGroup;
   displayData: any;
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
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentWithCallbackById/' + this.data.callbackId).subscribe((res: any) => {
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

  close = () => {
    this.dialogRef.close();
  }

  afterClosed = (dialogRef) => {
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openMedicalHistory = () => {
    this.isMedicalHistory = true;
    this.isContactHistory = false;
    this.sharedService.answer.emit('medical');
  }

  openContactHistory = () => {
    this.isContactHistory = true;
    this.isMedicalHistory = false;
    this.sharedService.answer.emit('contact');
  }

  openPatientCall = () => {
    this.isMedicalHistory = false;
    this.isContactHistory = false;
    this.sharedService.answer.emit('call');
  }

}
