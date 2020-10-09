import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AuthService} from '../../../../service/auth/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {archiveAnamnesData} from '../../../../utils/mock_data';

@Component({
  selector: 'app-archive-anamnes',
  templateUrl: './archive-anamnes.component.html',
  styleUrls: ['./archive-anamnes.component.scss']
})
export class ArchiveAnamnesComponent implements OnInit {
  filterValue = null;
  dataSource = new MatTableDataSource<any>();
  orderStatus = {
    active: '',
    direction: ''
  };
  currentPage = 0;
  pageSize = 5;
  displayedColumns: string[] = ['no', 'patientName', 'appointmentDate', 'status', 'actions'];

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.dataSource.data = archiveAnamnesData;
  }

  filter = () => {
  }

  onSort = (event) => {
  }

  anamnesView = () => {
  }
}
