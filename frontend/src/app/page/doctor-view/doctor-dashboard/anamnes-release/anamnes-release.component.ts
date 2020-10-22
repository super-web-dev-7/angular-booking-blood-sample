import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {AuthService} from '../../../../service/auth/auth.service';
import {patientAnamnesData} from '../../../../utils/mock_data';
import {AnamnesViewComponent} from './anamnes-view/anamnes-view.component';
import {AnamnesCheckComponent} from './anamnes-check/anamnes-check.component';
import {BreakpointObserver} from '@angular/cdk/layout';
import {SharedService} from '../../../../service/shared/shared.service';
import {SearchInputComponent} from '../search-input/search-input.component';
import {SuccessDialogComponent} from '../answer-inquiry/success-dialog/success-dialog.component';
import {MatSort} from '@angular/material/sort';
import {URL_JSON} from '../../../../utils/url_json';
import {HttpService} from '../../../../service/http/http.service';
import * as moment from 'moment';

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
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  currentPage = 0;
  pageSize = 5;
  dataSourceA = new MatTableDataSource<any>();
  displayedColumns: string[] = ['no', 'patientName', 'appointmentDate', 'status', 'actions'];
  isTablet = false;
  isMobile = false;
  allAnamnesis: any;

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    public breakpointObserver: BreakpointObserver,
    private sharedService: SharedService,
    public httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.dataSourceA.sort = this.sort;
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentsByAnamnes').subscribe((res: any) => {
      console.log(res);
      this.dataSourceA.data = res;
      this.allAnamnesis = res;
    });
  }

  filter = () => {
  }

  onSort = (event) => {
    this.orderStatus = event;
    const anams = [...this.allAnamnesis];

    if (event.active === 'patientName') {
      anams.sort((a, b) => {
        const x = a.patientFirstName + '' + a.patientLastName;
        const y = b.patientFirstName + '' + b.patientLastName;
        if (event.direction === 'asc') {
          return x < y ? 1 : -1;
        } else if (event.direction === 'desc') {
          return x > y ? 1 : -1;
        }
      });
      if (event.direction === '') {
        this.dataSourceA.data = this.allAnamnesis;
      } else {
        this.dataSourceA.data = anams;
      }
    } else if (event.active === 'appointmentDate') {
      anams.sort((a, b) => {
        const x = this.getTimeDuration(a.startTime, a.duration);
        const y = this.getTimeDuration(b.startTime, b.duration);
        if (event.direction === 'asc') {
          return x.localeCompare(y, 'de');
        } else if (event.direction === 'desc') {
          return y.localeCompare(x, 'de');
        }
      });
      if (event.direction === '') {
        this.dataSourceA.data = this.allAnamnesis;
      } else {
        this.dataSourceA.data = anams;
      }
    }
  }

  getTimeDuration = (startTime, duration) => {
    return moment(startTime).format('DD.MM.YYYY HH:mm') + ' - ' + moment(startTime + duration * 60 * 1000).format('HH:mm');
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

  checkAnamnes = (id) => {
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    if (this.isTablet || this.isMobile) {
      this.sharedService.tabletSide.emit('c-anam');
    } else {
      let dialogRef: MatDialogRef<any>;
      dialogRef = this.dialog.open(AnamnesCheckComponent, {
        width: '1347px',
        position: {top: '2%', left: '22%'},
        data: {appointmentId: id}
      });
      dialogRef.afterClosed().subscribe(res => {
        this.sharedService.closeHistory.emit();
        if (res) {
          dialogRef = this.dialog.open(SuccessDialogComponent, {
            width: '627px'
          });
        }
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
