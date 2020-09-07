import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {NewUserComponent} from '../new-user/new-user.component';
import {HttpService} from '../../../service/http/http.service';
import {URL_JSON} from '../../../utils/url_json';
import {AuthService} from '../../../service/auth/auth.service';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit {

  displayedColumns: string[] = ['no', 'firstName', 'lastName', 'email', 'phoneNumber', 'allocation', 'role', 'active', 'actions'];
  dataSource = new MatTableDataSource<any>();
  currentPage = 0;
  pageSize = 5;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  selectedDeleteItem: number = null;
  filterValue = null;
  allUser: any;
  orderStatus = {
    active: '',
    direction: ''
  };
  currentUser: any;

  constructor(
    public router: Router,
    public dialog: MatDialog,
    public httpService: HttpService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    const url = this.router.url.split('/');
    if (url[2] === 'new') {
      this.openDialog();
    } else {
      let query;
      if (this.currentUser.role === 'Superadmin') {
        query = '';
      } else if (this.currentUser.role === 'AG-Admin') {
        query = 'role=Nurse&role=Doctor';
      }
      this.httpService.get(URL_JSON.USER + '/get?' + query).subscribe((res: any) => {
        this.dataSource.data = res;
        this.allUser = res;
      });
    }
  }

  onPaginateChange = ($event: PageEvent) => {
    this.currentPage = $event.pageIndex;
    this.pageSize = $event.pageSize;
  }

  filter = () => {
    this.dataSource.data = this.allUser.filter(item => {
      return item.email.includes(this.filterValue)
        || item.firstName.includes(this.filterValue)
        || item.lastName.includes(this.filterValue);
    });
  }

  delete = (id) => {
    this.selectedDeleteItem = id;
  }

  deleteItem = () => {
    this.httpService.delete(URL_JSON.USER + '/delete/' + this.selectedDeleteItem).subscribe(res => {
      const dataSource = this.dataSource.data;
      const removedIndex = dataSource.findIndex(item => {
        return item.id === this.selectedDeleteItem;
      });
      dataSource.splice(removedIndex, 1);
      this.dataSource.data = dataSource;
    });
  }

  editItem = (id) => {
    const dataSource = this.dataSource.data;
    const data = dataSource.find(item => {
      return item.id === id;
    });
    const dialogRef = this.dialog.open(NewUserComponent, {
      width: '900px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.allUser.findIndex(item => item.id === result.id);
        const user = this.allUser[index];
        this.allUser[index] = {...user, ...result};
        this.dataSource.data = this.allUser;
      }
    });
  }

  openDialog = () => {
    const dialogRef = this.dialog.open(NewUserComponent, {
      width: '900px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl('user/overview');
    });
  }

  setActive = (event, id) => {
    const data = {
      isActive: event.checked
    };
    this.httpService.update(URL_JSON.USER + '/update/' + id, data).subscribe(res => {
    });
  }

  onSort = (event) => {
    this.orderStatus = event;
    const users = [...this.allUser];

    if (event.active === 'active') {
      users.sort((a, b) => {
        const x = a.isActive;
        const y = b.isActive;
        if (event.direction === 'asc') {
          return x < y ? 1 : -1;
        } else if (event.direction === 'desc') {
          return x > y ? 1 : -1;
        }
      });
    } else if (event.active === 'allocation') {
    } else {
      users.sort((a, b) => {
        const x = a[event.active];
        const y = b[event.active];
        if (event.direction === 'asc') {
          return x.localeCompare(y, 'de');
        } else if (event.direction === 'desc') {
          return y.localeCompare(x, 'de');
        }
      });
    }
    if (event.direction === '') {
      this.dataSource.data = this.allUser;
    } else {
      this.dataSource.data = users;
    }
  }
}
