import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {NewComponent} from '../new/new.component';

@Component({
  selector: 'app-open-dates',
  templateUrl: './open-dates.component.html',
  styleUrls: ['./open-dates.component.scss']
})
export class OpenDatesComponent implements OnInit {

  displayedColumns: string[] = ['no', 'date', 'time', 'patient', 'nurse', 'lastDoctor', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  currentPage = 0;
  pageSize = 5;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  selectedDeleteItem: number = null;

  orderStatus = {
    active: '',
    direction: ''
  };

  title = 'Offene';

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
    } else if (url[2] === 'open-dates') {
      this.title = 'Offene';
    } else if (url[2] === 'confirmed') {
      this.title = 'Bestätigte';
    } else if (url[2] === 'canceled') {
      this.title = 'Stornierte / verschobene';
    } else if (url[2] === 'completed') {
      this.title = 'Abgeschlossene';
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
    const dialogRef = this.dialog.open(NewComponent, {
      width: '650px',
      position: {left: '15%'}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl('appointment/open-dates');
    });
  }

  onSort = (event) => {
    this.orderStatus = event;
  }

}

const ELEMENT_DATA: any[] = [
  {
    id: 1,
    name: 'Allg. Gesundheits-Check-Up',
    number: '2548963 - 5',
    assign: 'Arbeitsgruppe 1 (+2)',
    price: 12350,
    status: 'Öffentlich'
  },
  {
    id: 2,
    name: 'Corona',
    number: '5452856 - 1',
    assign: 'Arbeitsgruppe 2',
    price: 7890,
    status: 'Intern'
  },
  {
    id: 3,
    name: 'Corona',
    number: '5452856 - 1',
    assign: 'Arbeitsgruppe 2',
    price: 7890,
    status: 'Intern'
  },
  {
    id: 4,
    name: 'Corona',
    number: '5452856 - 1',
    assign: 'Arbeitsgruppe 2',
    price: 7890,
    status: 'Intern'
  }
];
