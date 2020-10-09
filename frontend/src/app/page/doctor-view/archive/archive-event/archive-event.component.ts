import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AuthService} from '../../../../service/auth/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {archiveEventData} from '../../../../utils/mock_data';

@Component({
  selector: 'app-archive-event',
  templateUrl: './archive-event.component.html',
  styleUrls: ['./archive-event.component.scss']
})
export class ArchiveEventComponent implements OnInit {
  currentUser: any;
  filterValue = null;
  dataSource = new MatTableDataSource<any>();
  orderStatus = {
    active: '',
    direction: ''
  };
  currentPage = 0;
  pageSize = 5;
  displayedColumns: string[] = ['no', 'date', 'time', 'package', 'appointmentLocation', 'doctorLast', 'status', 'actions'];
  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.dataSource.data = archiveEventData;
  }

  filter = () => {
  }

  onSort = (event) => {
  }

  editItem = () => {
  }

}
