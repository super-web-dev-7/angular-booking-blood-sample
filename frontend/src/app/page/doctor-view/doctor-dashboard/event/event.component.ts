import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AuthService} from '../../../../service/auth/auth.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {eventData} from '../../../../utils/mock_data';
import {ViewAppointmentComponent} from './view-appointment/view-appointment.component';
import {BreakpointObserver} from '@angular/cdk/layout';
import {SharedService} from '../../../../service/shared/shared.service';
import {SearchInputComponent} from '../search-input/search-input.component';

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
  isTablet = false;
  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    public breakpointObserver: BreakpointObserver,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.dataSourceE.data = eventData;
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
  }

  filter = () => {
  }

  onSort = (event) => {
    this.orderStatus = event;
  }

  editItem = (id) => {
  }

  afterClosed = (dialogRef) => {
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  viewAppointment = () => {
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    if (this.isTablet) {
      this.sharedService.tabletSide.emit('v-appointment');
    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(ViewAppointmentComponent, {
        width: '827px',
      });
      this.afterClosed(dialogRef);
    }
  }

  openSearchDialog = () => {
    let dialogRef: MatDialogRef<any>;
    dialogRef = this.dialog.open(SearchInputComponent, {
      width: '100vw', maxWidth: '100vw', maxHeight: '100%', position: {top: '-10px'}
    });
    this.afterClosed(dialogRef);
  }
}
