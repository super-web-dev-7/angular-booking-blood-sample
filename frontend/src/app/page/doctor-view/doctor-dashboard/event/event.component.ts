import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AuthService} from '../../../../service/auth/auth.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {eventData} from '../../../../utils/mock_data';
import {SearchModalComponent} from '../search-modal/search-modal.component';
import {AnswerInquiryComponent} from '../answer-inquiry/answer-inquiry.component';

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

  searchItem = () => {
    let dialogRef: MatDialogRef<any>;
    dialogRef = this.dialog.open(SearchModalComponent, {
      width: '827px',
    });
    this.afterClosed(dialogRef);
  }

  afterClosed = (dialogRef) => {
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openAnswer = () => {
    let dialogRef: MatDialogRef<any>;
    dialogRef = this.dialog.open(AnswerInquiryComponent, {
      width: '1347px',
    });
    this.afterClosed(dialogRef);
  }
}
