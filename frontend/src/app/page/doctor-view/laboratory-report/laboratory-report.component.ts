import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AuthService} from '../../../service/auth/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {laboratoryData} from '../../../utils/mock_data';

@Component({
  selector: 'app-laboratory-report',
  templateUrl: './laboratory-report.component.html',
  styleUrls: ['./laboratory-report.component.scss']
})
export class LaboratoryReportComponent implements OnInit {
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
    this.dataSource.data = laboratoryData;
  }

  filter = () => {
  }

  onSort = (event) => {
    this.orderStatus = event;
  }

  editItem = () => {
  }

}
