import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {AuthService} from '../../../../service/auth/auth.service';
import {patientAnamnesData} from '../../../../utils/mock_data';
import {AnamnesViewComponent} from './anamnes-view/anamnes-view.component';
import {AnamnesCheckComponent} from './anamnes-check/anamnes-check.component';

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

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.dataSourceA.data = patientAnamnesData;
  }

  filter = () => {
  }

  onSort = (event) => {
  }

  editItem = (id) => {
  }

  afterClosed = (dialogRef) => {
    dialogRef.afterClosed().subscribe(result => {
    });
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
