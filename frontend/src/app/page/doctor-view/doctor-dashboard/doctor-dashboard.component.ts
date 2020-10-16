import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../../service/auth/auth.service';
import {MatTableDataSource} from '@angular/material/table';
import {eventData, patientAnamnesData, patientInjuryData} from '../../../utils/mock_data';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SearchModalComponent} from './search-modal/search-modal.component';
import {AnswerInquiryComponent} from './answer-inquiry/answer-inquiry.component';
import {AnamnesViewComponent} from './anamnes-release/anamnes-view/anamnes-view.component';
import {AnamnesCheckComponent} from './anamnes-release/anamnes-check/anamnes-check.component';
import {ViewAppointmentComponent} from './event/view-appointment/view-appointment.component';
import {BreakpointObserver} from "@angular/cdk/layout";

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
  isTablet = false;
  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    public breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.dataSourceP.data = patientInjuryData;
    this.dataSourceA.data = patientAnamnesData;
    this.dataSourceE.data = eventData;
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
  }


  filter = () => {
  }

  onSort = (event) => {
  }

  editItem = (id) => {
  }

  searchItem = () => {
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    if (this.isTablet) {

    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(SearchModalComponent, {
        width: '827px',
      });
      this.afterClosed(dialogRef);
    }
  }

  afterClosed = (dialogRef) => {
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openAnswer = () => {
    let dialogRef: MatDialogRef<any>;
    dialogRef = this.dialog.open(AnswerInquiryComponent, {
      width: '1347px', position: { top: '5%', left: '21%'}
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
      position: { top: '2%', left: '22%'}
    });
    this.afterClosed(dialogRef);
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
