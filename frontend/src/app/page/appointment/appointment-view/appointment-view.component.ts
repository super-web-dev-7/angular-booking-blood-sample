import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import * as moment from 'moment';

import {HttpService} from '../../../service/http/http.service';
import {URL_JSON} from '../../../utils/url_json';
import {ModalMedicalComponent} from './modal-medical/modal-medical.component';

@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.scss']
})
export class AppointmentViewComponent implements OnInit {

  isShowPatient = false;
  isShowSchedule = false;
  contactHistoryData: any;
  medicalQuestion: any;
  constructor(
    public dialogRef: MatDialogRef<any>,
    public router: Router,
    public httpService: HttpService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.httpService.get(URL_JSON.DOCTOR + '/getContactHistory/' + this.data.id).subscribe((res: any) => {
      if (res) {
        this.contactHistoryData = res.contactHistory;
      }
    });
  }

  close = () => {
    this.dialogRef.close();
  }

  showMedicalQuestion = () => {
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentWithQuestionById/' + this.data.id).subscribe((res: any) => {
      this.medicalQuestion = res.length > 0 ? res[0] : null;
      const dialogRef = this.dialog.open(ModalMedicalComponent, {
        width: '400px',
        position: {left: '30%'},
        data: this.medicalQuestion
      });
      dialogRef.afterClosed().subscribe(() => {
      });
    });
  }

  getDate = time => {
    moment.locale('de');
    return moment(time).format('ddd DD.MM.YYYY HH:mm');
  }

  onSubmit = () => {
    this.dialogRef.close();
    this.router.navigateByUrl('/appointment/new');
  }
}
