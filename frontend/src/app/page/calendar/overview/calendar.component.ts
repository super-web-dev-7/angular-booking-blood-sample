import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {NewCalendarComponent} from '../new-calendar/new-calendar.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  displayedColumns: string[] = ['no', 'calendarName', 'district', 'nurse', 'interval', 'actions'];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  currentPage = 0;
  pageSize = 5;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  selectedDeleteItem: number = null;

  constructor(
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    const url = this.router.url.split('/');
    if (url[2] === 'new') {
      this.openDialog();
    }
  }

  onPaginateChange = ($event: PageEvent) => {
    this.currentPage = $event.pageIndex;
    this.pageSize = $event.pageSize;
  }

  delete = (id) => {
    this.selectedDeleteItem = id;
  }

  deleteItem = () => {
    this.selectedDeleteItem = null;
  }

  openDialog = () => {
    const dialogRef = this.dialog.open(NewCalendarComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl('calendar/overview');
    });
  }

}

const ELEMENT_DATA: any[] = [
  {
    id: 1,
    name: 'Bezirk 1',
    zipCode: [
      {
        from: 12000,
        to: 12999
      }
    ],
    active: true
  },
  {
    id: 2,
    name: 'Wilmersdorf',
    zipCode: [
      {
        from: 10700,
        to: 10999
      },
      {
        from: 14055,
        to: 14199
      }
    ],
    active: false
  },
  {
    id: 3,
    name: 'Spandau',
    zipCode: [
      {
        from: 13000,
        to: 13999
      }
    ],
    active: true
  },
  {
    id: 4,
    name: 'Mitte',
    zipCode: [
      {
        from: 10000,
        to: 10700
      }
    ],
    active: false
  }
];
