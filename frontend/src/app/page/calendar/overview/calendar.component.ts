import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {NewCalendarComponent} from '../new-calendar/new-calendar.component';
import {HttpService} from '../../../service/http/http.service';
import {URL_JSON} from '../../../utils/url_json';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  displayedColumns: string[] = ['no', 'calendarName', 'district', 'nurse', 'interval', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  currentPage = 0;
  pageSize = 5;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  selectedDeleteItem: number = null;
  orderStatus = {
    active: '',
    direction: ''
  };
  allCalendar = [];
  filterValue = null;

  constructor(
    public router: Router,
    public dialog: MatDialog,
    public httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    const url = this.router.url.split('/');
    if (url[2] === 'new') {
      this.openDialog();
    }
    this.httpService.get(URL_JSON.CALENDAR + '/get').subscribe((res: any) => {
      for (const item of res) {
        item.district.zipcode = JSON.parse(item.district.zipcode);
      }
      this.dataSource.data = res;
      this.allCalendar = res;
    });
  }

  getFloorValue = (value) => {
    return Math.floor(value);
  }

  onPaginateChange = ($event: PageEvent) => {
    this.currentPage = $event.pageIndex;
    this.pageSize = $event.pageSize;
  }

  filter = () => {
    this.dataSource.data = this.allCalendar.filter(item => {
      return item.name.includes(this.filterValue)
        || JSON.stringify(item.district.zipcode).includes(this.filterValue)
        || item.user.firstName.includes(this.filterValue)
        || item.working_time_from.includes(this.filterValue)
        || item.working_time_until.includes(this.filterValue)
        || item.duration_appointment.includes(this.filterValue)
        || item.rest_time.includes(this.filterValue);
    });
  }

  delete = (id) => {
    this.selectedDeleteItem = id;
  }

  deleteItem = () => {
    this.httpService.delete(URL_JSON.CALENDAR + '/delete/' + this.selectedDeleteItem).subscribe(res => {
      const dataSource = this.dataSource.data;
      const removedIndex = dataSource.findIndex(item => {
        return item.id === this.selectedDeleteItem;
      });
      dataSource.splice(removedIndex, 1);
      this.dataSource.data = dataSource;
    });
  }

  openDialog = () => {
    const dialogRef = this.dialog.open(NewCalendarComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl('calendar/overview');
    });
  }

  onSort = (event) => {
    this.orderStatus = event;
    const calendars = [...this.allCalendar];
    if (event.active === 'calendarName') {
      calendars.sort((a, b) => {
        const x = a.name;
        const y = b.name;
        if (event.direction === 'asc') {
          return x > y ? 1 : -1;
        } else if (event.direction === 'desc') {
          return x < y ? 1 : -1;
        }
      });
      if (event.direction === '') {
        this.dataSource.data = this.allCalendar;
      } else {
        this.dataSource.data = calendars;
      }
    } else if (event.active === 'district') {
      calendars.sort((a, b) => {
        const x = a.district.name;
        const y = b.district.name;
        if (event.direction === 'asc') {
          return x > y ? 1 : -1;
        } else if (event.direction === 'desc') {
          return x < y ? 1 : -1;
        }
      });
      if (event.direction === '') {
        this.dataSource.data = this.allCalendar;
      } else {
        this.dataSource.data = calendars;
      }
    } else if (event.active === 'interval') {
      calendars.sort((a, b) => {
        const x = a.duration_appointment;
        const y = b.duration_appointment;
        if (event.direction === 'asc') {
          return x > y ? 1 : -1;
        } else if (event.direction === 'desc') {
          return x < y ? 1 : -1;
        }
      });
      if (event.direction === '') {
        this.dataSource.data = this.allCalendar;
      } else {
        this.dataSource.data = calendars;
      }
    }
  }

  editItem = (data) => {
    const dialogRef = this.dialog.open(NewCalendarComponent, {
      width: '900px',
      data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.district.zipcode = JSON.parse(result.district.zipcode);
        const index = this.allCalendar.findIndex(item => item.id === result.id);
        const calendar = this.allCalendar[index];
        this.allCalendar[index] = {...calendar, ...result};
        this.dataSource.data = this.allCalendar;
      }
    });
  }
}
