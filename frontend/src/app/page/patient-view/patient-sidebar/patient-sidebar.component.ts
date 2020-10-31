import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';

import {URL_JSON} from '../../../utils/url_json';
import {HttpService} from '../../../service/http/http.service';
import {AuthService} from '../../../service/auth/auth.service';
import {EditProfileComponent} from './edit-profile/edit-profile.component';

@Component({
  selector: 'app-patient-sidebar',
  templateUrl: './patient-sidebar.component.html',
  styleUrls: ['./patient-sidebar.component.scss']
})
export class PatientSidebarComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  currentUser: any;

  constructor(
    public dialog: MatDialog,
    public authService: AuthService,
    public httpService: HttpService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
  }

  close = () => {
    this.closeSide.emit(false);
  }

  editProfile = () => {
    this.closeSide.emit(false);
    this.httpService.get(URL_JSON.USER + '/getUser/' + this.currentUser.id).subscribe((res: any) => {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(EditProfileComponent, {
        width: '1167px',
        data: res
      });
      dialogRef.afterClosed().subscribe(() => {
      });
    });
  }

  logout = () => {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
