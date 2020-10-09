import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AuthService} from '../../../../service/auth/auth.service';
import {MatDialog} from '@angular/material/dialog';
import { archivePatientData } from '../../../../utils/mock_data';

@Component({
  selector: 'app-archive-patient',
  templateUrl: './archive-patient.component.html',
  styleUrls: ['./archive-patient.component.scss']
})
export class ArchivePatientComponent implements OnInit {
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
    this.dataSource.data = archivePatientData;
  }

  filter = () => {
  }

  onSort = (event) => {
  }

  searchItem = () => {
  }
}
