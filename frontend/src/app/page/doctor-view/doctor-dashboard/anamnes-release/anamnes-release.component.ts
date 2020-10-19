import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {AuthService} from '../../../../service/auth/auth.service';
import {patientAnamnesData} from '../../../../utils/mock_data';
import {AnamnesViewComponent} from './anamnes-view/anamnes-view.component';
import {AnamnesCheckComponent} from './anamnes-check/anamnes-check.component';
import {BreakpointObserver} from '@angular/cdk/layout';
import {SharedService} from '../../../../service/shared/shared.service';
import {SearchInputComponent} from '../search-input/search-input.component';

@Component({
  selector: 'app-anamnes-release',
  templateUrl: './anamnes-release.component.html',
  styleUrls: ['./anamnes-release.component.scss']
})
export class AnamnesReleaseComponent implements OnInit {
  currentUser: any;
  filterValue = null;
  orderStatus = {
    active: '',
    direction: ''
  };
  currentPage = 0;
  pageSize = 5;
  dataSourceA = new MatTableDataSource<any>();
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
    this.dataSourceA.data = patientAnamnesData;
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
  }

  filter = () => {
  }

  onSort = (event) => {
    this.orderStatus = event;
  }

  editItem = (id) => {
  }

  afterClosed = (dialogRef) => {
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  anamnesView = () => {
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    if (this.isTablet) {
      this.sharedService.tabletSide.emit('v-anam');
    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(AnamnesViewComponent, {
        width: '827px',
        height: '844px'
      });
      this.afterClosed(dialogRef);
    }
  }

  checkAnamnes = () => {
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    if (this.isTablet) {
      this.sharedService.tabletSide.emit('c-anam');
    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(AnamnesCheckComponent, {
        width: '1347px',
        position: {top: '2%', left: '22%'}
      });
      dialogRef.afterClosed().subscribe(res => {
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
