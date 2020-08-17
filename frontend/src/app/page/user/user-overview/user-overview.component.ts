import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {NewUserComponent} from '../new-user/new-user.component';

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
    console.log($event);
    this.currentPage = $event.pageIndex;
    this.pageSize = $event.pageSize;
  }

  delete = (id) => {
    console.log(id);
    this.selectedDeleteItem = id;
  }

  deleteItem = () => {
    this.selectedDeleteItem = null;
  }

  openDialog = () => {
    const dialogRef = this.dialog.open(NewUserComponent, {
      width: '900px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl('user/overview');
    });
  }
}

const ELEMENT_DATA: any[] = [
  {
    id: 1,
    firstName: 'Karsten',
    lastName: 'Birkenstamm',
    email: 'birkenstamm@previmo.de',
    phoneNumber: '015123598744',
    allocation: 'Agentur 1',
    role: 'Superadmin',
    active: true
  },
  {
    id: 2,
    firstName: 'Karsten',
    lastName: 'Birkenstamm',
    email: 'birkenstamm@previmo.de',
    phoneNumber: '015123598744',
    allocation: 'Agentur 1',
    role: 'Superadmin',
    active: true
  },
  {
    id: 3,
    firstName: 'Karsten',
    lastName: 'Birkenstamm',
    email: 'birkenstamm@previmo.de',
    phoneNumber: '015123598744',
    allocation: 'Agentur 1',
    role: 'Superadmin',
    active: true
  },
  {
    id: 4,
    firstName: 'Karsten',
    lastName: 'Birkenstamm',
    email: 'birkenstamm@previmo.de',
    phoneNumber: '015123598744',
    allocation: 'Agentur 1',
    role: 'Superadmin',
    active: true
  }
];
