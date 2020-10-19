import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthService} from '../../service/auth/auth.service';

@Component({
  selector: 'app-session-expire-alert',
  templateUrl: './session-expire-alert.component.html',
  styleUrls: ['./session-expire-alert.component.scss']
})
export class SessionExpireAlertComponent implements OnInit {

  remainSecond = 30;
  interval;

  constructor(
    public authService: AuthService,
    public dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
    const now = new Date();
    const currentSecond = Math.ceil(now.getTime() / 1000);
    if (this.authService.currentUserValue.exp - currentSecond > 30) {
      this.remainSecond = 30;
    } else {
      this.remainSecond = this.authService.currentUserValue.exp - currentSecond;
    }
    this.interval = setInterval(() => {
      this.remainSecond--;
      if (this.remainSecond <= 0) {
        this.dialogRef.close();
        this.removeToken();
        clearInterval(this.interval);
      }
    }, 1000);
  }

  resetToken = () => {
    clearInterval(this.interval);
    this.authService.resetSessionTime();
    this.authService.showExpireAlertSubject.next(false);
  }

  removeToken = () => {
    this.authService.logout();
  }

}
