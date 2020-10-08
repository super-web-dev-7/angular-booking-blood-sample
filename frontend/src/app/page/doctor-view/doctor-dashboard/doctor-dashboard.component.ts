import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../service/auth/auth.service';
import {MatTableDataSource} from '@angular/material/table';
import {eventData, patientAnamnesData, patientInjuryData} from '../../../utils/mock_data';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SearchModalComponent} from './search-modal/search-modal.component';
import {AnswerInquiryComponent} from './answer-inquiry/answer-inquiry.component';
import {AnamnesViewComponent} from './anamnes-release/anamnes-view/anamnes-view.component';
import {AnamnesCheckComponent} from './anamnes-release/anamnes-check/anamnes-check.component';

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
    public authService: AuthService,
    public dialog: MatDialog,
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

  anamnesView = () => {
    let dialogRef: MatDialogRef<any>;
    dialogRef = this.dialog.open(AnamnesViewComponent, {
      width: '827px',
      height: '844px'
    });
    this.afterClosed(dialogRef);
  }

  checkAnamnes = () => {
    let dialogRef: MatDialogRef<any>;
    dialogRef = this.dialog.open(AnamnesCheckComponent, {
      width: '1347px',
      height: '858px'
    });
    this.afterClosed(dialogRef);
  }
}
