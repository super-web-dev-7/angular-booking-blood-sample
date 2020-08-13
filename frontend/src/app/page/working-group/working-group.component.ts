import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

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
  constructor() { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onPaginateChange = ($event: PageEvent) => {
    console.log($event);
    this.currentPage = $event.pageIndex;
    this.pageSize = $event.pageSize;
  }
}

const ELEMENT_DATA: any[] = [
  {
    group_name: 'Arbeitsgruppe 1',
    group_admin: 'Martin Reimer (+2)',
    calendar_resource: 'Kalenderressource / Bezirk nicht ausgewählt',
    active: true
  },
  {
    group_name: 'Arbeitsgruppe 2',
    group_admin: 'Martin Reimer (+2)',
    calendar_resource: 'Kalenderressource / Bezirk nicht ausgewählt',
    active: false
  },
  {
    group_name: 'Arbeitsgruppe 3',
    group_admin: 'Martin Reimer (+2)',
    calendar_resource: 'Kalenderressource / Bezirk nicht ausgewählt',
    active: true
  },
  {
    group_name: 'Arbeitsgruppe 4',
    group_admin: 'Martin Reimer (+2)',
    calendar_resource: 'Kalenderressource / Bezirk nicht ausgewählt',
    active: false
  },
  {
    group_name: 'Arbeitsgruppe 4',
    group_admin: 'Martin Reimer (+2)',
    calendar_resource: 'Kalenderressource / Bezirk nicht ausgewählt',
    active: false
  },
  {
    group_name: 'Arbeitsgruppe 4',
    group_admin: 'Martin Reimer (+2)',
    calendar_resource: 'Kalenderressource / Bezirk nicht ausgewählt',
    active: false
  },
  {
    group_name: 'Arbeitsgruppe 4',
    group_admin: 'Martin Reimer (+2)',
    calendar_resource: 'Kalenderressource / Bezirk nicht ausgewählt',
    active: false
  },
  {
    group_name: 'Arbeitsgruppe 4',
    group_admin: 'Martin Reimer (+2)',
    calendar_resource: 'Kalenderressource / Bezirk nicht ausgewählt',
    active: false
  },
];
