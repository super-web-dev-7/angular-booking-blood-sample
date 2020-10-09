import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AuthService} from '../../../../service/auth/auth.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {eventData} from '../../../../utils/mock_data';
import {ViewAppointmentComponent} from './view-appointment/view-appointment.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  currentUser: any;
  filterValue = null;
  orderStatus = {
    active: '',
    direction: ''
  };
  currentPage = 0;
  pageSize = 5;
  dataSourceE = new MatTableDataSource<any>();
  displayedColumnsE: string[] = ['no', 'date', 'time', 'package', 'appointmentLocation', 'doctorLast', 'status', 'actions'];
  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.dataSourceE.data = eventData;
  }

  filter = () => {
  }

  onSort = (event) => {
  }

  editItem = (id) => {
  }

  afterClosed = (dialogRef) => {
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  viewAppointment = () => {
    let dialogRef: MatDialogRef<any>;
    dialogRef = this.dialog.open(ViewAppointmentComponent, {
      width: '827px',
      height: '718px'
    });
    this.afterClosed(dialogRef);
  }
}
