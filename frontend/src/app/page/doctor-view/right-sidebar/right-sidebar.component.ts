import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../service/auth/auth.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ProfileComponent} from '../../profile/profile.component';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit {
  @Output() closeSide = new EventEmitter();

  constructor(
    public authService: AuthService,
    public router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  openProfile = () => {
    this.closeSide.emit(false);
    let dialogRef: MatDialogRef<any>;
    dialogRef = this.dialog.open(ProfileComponent, {
      width: '730px',
    });
    dialogRef.afterClosed().subscribe(res => {});
  }

  close = () => {
    this.closeSide.emit(false);
  }

  logout = () => {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
