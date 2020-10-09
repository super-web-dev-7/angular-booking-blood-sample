import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../service/auth/auth.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {patientInjuryData} from '../../../../utils/mock_data';
import {MatTableDataSource} from '@angular/material/table';
import {SearchModalComponent} from '../search-modal/search-modal.component';
import {AnswerInquiryComponent} from '../answer-inquiry/answer-inquiry.component';
import {SuccessDialogComponent} from '../answer-inquiry/success-dialog/success-dialog.component';

@Component({
  selector: 'app-patinet-inquiry',
  templateUrl: './patinet-inquiry.component.html',
  styleUrls: ['./patinet-inquiry.component.scss']
})
export class PatinetInquiryComponent implements OnInit {
  currentUser: any;
  filterValue = null;
  orderStatus = {
    active: '',
    direction: ''
  };
  currentPage = 0;
  pageSize = 5;
  dataSourceP = new MatTableDataSource<any>();
  displayedColumns: string[] = ['no', 'patientName', 'appointmentDate', 'status', 'actions'];

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.dataSourceP.data = patientInjuryData;
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
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.dialog.open(SuccessDialogComponent, {
          width: '662px',
          height: '308px'
        });
      }
    });
  }

}
