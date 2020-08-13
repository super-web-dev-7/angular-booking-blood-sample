import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit {

  displayedColumns: string[] = ['no', 'firstName', 'lastName', 'email', 'phoneNumber', 'allocation', 'role', 'active', 'actions'];
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
    firstName: 'Karsten',
    lastName: 'Birkenstamm',
    email: 'birkenstamm@previmo.de',
    phoneNumber: '015123598744',
    allocation: 'Agentur 1',
    role: 'Superadmin',
    active: true
  },
  {
    firstName: 'Karsten',
    lastName: 'Birkenstamm',
    email: 'birkenstamm@previmo.de',
    phoneNumber: '015123598744',
    allocation: 'Agentur 1',
    role: 'Superadmin',
    active: true
  },
  {
    firstName: 'Karsten',
    lastName: 'Birkenstamm',
    email: 'birkenstamm@previmo.de',
    phoneNumber: '015123598744',
    allocation: 'Agentur 1',
    role: 'Superadmin',
    active: true
  },
  {
    firstName: 'Karsten',
    lastName: 'Birkenstamm',
    email: 'birkenstamm@previmo.de',
    phoneNumber: '015123598744',
    allocation: 'Agentur 1',
    role: 'Superadmin',
    active: true
  }
];
