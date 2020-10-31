import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../service/auth/auth.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ProfileComponent} from '../../profile/profile.component';
import {HttpService} from '../../../service/http/http.service';
import {URL_JSON} from '../../../utils/url_json';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  currentUser: any;
  userData: any;

  constructor(
    public authService: AuthService,
    public router: Router,
    public dialog: MatDialog,
    public httpService: HttpService
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.httpService.get(URL_JSON.USER + '/getUser/' + this.currentUser?.id).subscribe( (res: any) => {
     this.userData = res;
    });
  }

  openProfile = () => {
    this.closeSide.emit(false);
    let dialogRef: MatDialogRef<any>;
    dialogRef = this.dialog.open(ProfileComponent, {
      width: '730px',
      data: this.userData
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(this.currentUser);
    });
  }

  close = () => {
    this.closeSide.emit(false);
  }

  logout = () => {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
