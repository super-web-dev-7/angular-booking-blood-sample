import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {AuthService} from '../../../service/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-patient-sidebar',
  templateUrl: './patient-sidebar.component.html',
  styleUrls: ['./patient-sidebar.component.scss']
})
export class PatientSidebarComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  constructor(
    public dialog: MatDialog,
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  close = () => {
    this.closeSide.emit(false);
  }

  editProfile = () => {
    this.closeSide.emit(false);
    let dialogRef: MatDialogRef<any>;
    dialogRef = this.dialog.open(EditProfileComponent, {
      width: '1167px',
    });
    dialogRef.afterClosed().subscribe(res => {});
  }

  logout = () => {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
