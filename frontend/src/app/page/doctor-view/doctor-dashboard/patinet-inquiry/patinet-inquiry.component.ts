import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../service/auth/auth.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {patientInjuryData} from '../../../../utils/mock_data';
import {MatTableDataSource} from '@angular/material/table';
import {SearchModalComponent} from '../search-modal/search-modal.component';
import {AnswerInquiryComponent} from '../answer-inquiry/answer-inquiry.component';
import {SuccessDialogComponent} from '../answer-inquiry/success-dialog/success-dialog.component';
import {BreakpointObserver} from '@angular/cdk/layout';
import {SharedService} from '../../../../service/shared/shared.service';
import {SearchInputComponent} from '../search-input/search-input.component';

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
  isTablet = false;

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    public breakpointObserver: BreakpointObserver,
    private sharedService: SharedService
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
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    if (this.isTablet) {
      this.sharedService.tabletSide.emit('inquiry');
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
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    if (this.isTablet) {
      this.sharedService.tabletSide.emit('answer');
    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(AnswerInquiryComponent, {
        width: '1347px', position: {top: '5%', left: '21%'}
      });
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.dialog.open(SuccessDialogComponent, {
            width: '662px',
            height: '308px'
          });
        }
        this.sharedService.closeHistory.emit();
      });
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
