import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {HttpService} from '../../../service/http/http.service';
import {AuthService} from '../../../service/auth/auth.service';
import {URL_JSON} from '../../../utils/url_json';
import {NewComponent} from '../../working-group/new/new.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  displayedColumns: string[] = ['no', 'template', 'datetime', 'receiver', 'phoneNumber', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  currentPage = 0;
  pageSize = 5;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  selectedDeleteItem: number = null;
  allGroup = [];
  filterValue = null;
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

    this.httpService.get(URL_JSON.GROUP + '/get').subscribe((res: any) => {
      this.dataSource.data = res;
      this.allGroup = res;
    });
  }

  onPaginateChange = ($event: PageEvent) => {
    this.currentPage = $event.pageIndex;
    this.pageSize = $event.pageSize;
  }

  filter = () => {
    this.dataSource.data = this.allGroup.filter(item => {
      return item.name.includes(this.filterValue)
        || item.calendar.name.includes(this.filterValue)
        || (item.user.firstName + ' ' + item.user.lastName).includes(this.filterValue);
    });
  }

  onSort = (event) => {
    this.orderStatus = event;
    const groups = [...this.allGroup];
    if (event.direction === '') {
      this.dataSource.data = this.allGroup;
      return;
    }
    if (event.active === 'active') {
      groups.sort((a, b) => {
        const x = a.isActive;
        const y = b.isActive;
        if (event.direction === 'asc') {
          return x < y ? 1 : -1;
        } else if (event.direction === 'desc') {
          return x > y ? 1 : -1;
        }
      });
    } else if (event.active === 'group_admin') {
      groups.sort((a, b) => {
        const x = a.user.firstName;
        const y = b.user.firstName;
        if (event.direction === 'asc') {
          return x.localeCompare(y, 'de');
        } else if (event.direction === 'desc') {
          return y.localeCompare(x, 'de');
        }
      });
    } else if (event.active === 'calendar_resource') {
      groups.sort((a, b) => {
        const x = a.calendar.name;
        const y = b.calendar.name;
        if (event.direction === 'asc') {
          return x.localeCompare(y, 'de');
        } else if (event.direction === 'desc') {
          return y.localeCompare(x, 'de');
        }
      });
    } else if (event.active === 'name') {
      groups.sort((a, b) => {
        const x = a.name;
        const y = b.name;
        if (event.direction === 'asc') {
          return x.localeCompare(y, 'de');
        } else if (event.direction === 'desc') {
          return y.localeCompare(x, 'de');
        }
      });
    }
    this.dataSource.data = groups;
  }
}
