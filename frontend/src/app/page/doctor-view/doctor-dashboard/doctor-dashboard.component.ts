import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../service/auth/auth.service';
import {MatTableDataSource} from '@angular/material/table';
import {eventData, patientAnamnesData, patientInjuryData} from '../../../utils/mock_data';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss']
})
export class DoctorDashboardComponent implements OnInit {
  currentUser: any;
  filterValue = null;
  dataSourceP = new MatTableDataSource<any>();
  dataSourceA = new MatTableDataSource<any>();
  dataSourceE = new MatTableDataSource<any>();
  orderStatus = {
    active: '',
    direction: ''
  };
  currentPage = 0;
  pageSize = 5;
  displayedColumns: string[] = ['no', 'patientName', 'appointmentDate', 'status', 'actions'];
  displayedColumnsE: string[] = ['no', 'date', 'time', 'package', 'appointmentLocation', 'doctorLast', 'status', 'actions'];

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.dataSourceP.data = patientInjuryData;
    this.dataSourceA.data = patientAnamnesData;
    this.dataSourceE.data = eventData;
  }


  filter = () => {
  }

  onSort = (event) => {
  }

  editItem = (id) => {
  }
}
