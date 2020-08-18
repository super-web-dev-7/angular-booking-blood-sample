import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {NewComponent} from './new/new.component';

@Component({
  selector: 'app-working-group',
  templateUrl: './working-group.component.html',
  styleUrls: ['./working-group.component.scss']
})
export class WorkingGroupComponent implements OnInit {

  displayedColumns: string[] = ['no', 'group_name', 'group_admin', 'calendar_resource', 'active', 'actions'];
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
    const dialogRef = this.dialog.open(NewComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl('working-group/overview');
    });
  }
}

const ELEMENT_DATA: any[] = [
  {
    id: 1,
    group_name: 'Arbeitsgruppe 1',
    group_admin: 'Martin Reimer (+2)',
    calendar_resource: 'Kalenderressource / Bezirk nicht ausgewählt',
    active: true
  },
  {
    id: 2,
    group_name: 'Arbeitsgruppe 2',
    group_admin: 'Martin Reimer (+2)',
    calendar_resource: 'Kalenderressource / Bezirk nicht ausgewählt',
    active: false
  },
  {
    id: 3,
    group_name: 'Arbeitsgruppe 3',
    group_admin: 'Martin Reimer (+2)',
    calendar_resource: 'Kalenderressource / Bezirk nicht ausgewählt',
    active: true
  },
  {
    id: 4,
    group_name: 'Arbeitsgruppe 4',
    group_admin: 'Martin Reimer (+2)',
    calendar_resource: 'Kalenderressource / Bezirk nicht ausgewählt',
    active: false
  },
  {
    id: 5,
    group_name: 'Arbeitsgruppe 4',
    group_admin: 'Martin Reimer (+2)',
    calendar_resource: 'Kalenderressource / Bezirk nicht ausgewählt',
    active: false
  },
  {
    id: 6,
    group_name: 'Arbeitsgruppe 4',
    group_admin: 'Martin Reimer (+2)',
    calendar_resource: 'Kalenderressource / Bezirk nicht ausgewählt',
    active: false
  },
  {
    id: 7,
    group_name: 'Arbeitsgruppe 4',
    group_admin: 'Martin Reimer (+2)',
    calendar_resource: 'Kalenderressource / Bezirk nicht ausgewählt',
    active: false
  },
  {
    id: 8,
    group_name: 'Arbeitsgruppe 4',
    group_admin: 'Martin Reimer (+2)',
    calendar_resource: 'Kalenderressource / Bezirk nicht ausgewählt',
    active: false
  },
];
