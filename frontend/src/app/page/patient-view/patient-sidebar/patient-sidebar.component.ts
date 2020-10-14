import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EditProfileComponent} from './edit-profile/edit-profile.component';

@Component({
  selector: 'app-patient-sidebar',
  templateUrl: './patient-sidebar.component.html',
  styleUrls: ['./patient-sidebar.component.scss']
})
export class PatientSidebarComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  constructor(
    public dialog: MatDialog,
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
}
