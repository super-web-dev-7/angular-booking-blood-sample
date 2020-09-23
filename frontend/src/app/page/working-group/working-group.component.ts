import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

import {NewComponent} from './new/new.component';
import {HttpService} from '../../service/http/http.service';
import {URL_JSON} from '../../utils/url_json';
import {AuthService} from '../../service/auth/auth.service';


@Component({
  selector: 'app-working-group',
  templateUrl: './working-group.component.html',
  styleUrls: ['./working-group.component.scss']
})
export class WorkingGroupComponent implements OnInit {

  displayedColumns: string[] = ['no', 'name', 'group_admin', 'calendar_resource', 'nurse', 'interval', 'agency', 'active', 'actions'];
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
    public snackBar: MatSnackBar,
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
    }
    this.httpService.get(URL_JSON.GROUP + '/get').subscribe((res: any) => {
      this.dataSource.data = res;
      this.allGroup = res;
    });
  }

  onPaginateChange = ($event: PageEvent) => {
    this.currentPage = $event.pageIndex;
    this.pageSize = $event.pageSize;
  }

  getFloorValue = (value) => {
    return Math.floor(value);
  }

  filter = () => {
    this.dataSource.data = this.allGroup.filter(item => {
      return item.name.includes(this.filterValue)
        || item.calendar.name.includes(this.filterValue)
        || (item.user.firstName + ' ' + item.user.lastName).includes(this.filterValue)
        || item.working_time_from.includes(this.filterValue)
        || item.working_time_until.includes(this.filterValue)
        || item.duration_appointment.includes(this.filterValue)
        || item.rest_time.includes(this.filterValue)
        || item.agency.name.includes(this.filterValue);
    });
  }

  delete = (id) => {
    this.selectedDeleteItem = id;
  }

  deleteItem = () => {
    this.httpService.delete(URL_JSON.GROUP + '/delete/' + this.selectedDeleteItem).subscribe(() => {
      const dataSource = this.dataSource.data;
      const removedIndex = dataSource.findIndex(item => {
        return item.id === this.selectedDeleteItem;
      });
      dataSource.splice(removedIndex, 1);
      this.dataSource.data = dataSource;
    }, error => {
      this.snackBar.open('You can\'t delete this item.', 'Warning', {duration: 3000});
      this.selectedDeleteItem = null;
    });
  }

  openDialog = () => {
    const dialogRef = this.dialog.open(NewComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl('working-group/overview');
    });
  }

  setActive = (event, id) => {
    const data = {
      isActive: event.checked
    };
    this.httpService.update(URL_JSON.GROUP + '/update/' + id, data).subscribe(res => {
    });
  }

  editItem = (id) => {
    const dataSource = this.dataSource.data;
    const data = dataSource.find(item => {
      return item.id === id;
    });
    const dialogRef = this.dialog.open(NewComponent, {
      width: '900px',
      data
    });
    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        const index = this.allGroup.findIndex(item => item.id === response.id);
        const user = this.allGroup[index];
        this.allGroup[index] = {...user, ...response};
        this.dataSource.data = this.allGroup;
      }
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
    } else if (event.active === 'nurse') {
      groups.sort((a, b) => {
        const x = a.user.firstName;
        const y = b.user.firstName;
        if (event.direction === 'asc') {
          return x.localeCompare(y, 'de');
        } else if (event.direction === 'desc') {
          return y.localeCompare(x, 'de');
        }
      });
    } else if (event.active === 'agency') {
      groups.sort((a, b) => {
        const x = a.agency.name;
        const y = b.agency.name;
        if (event.direction === 'asc') {
          return x.localeCompare(y, 'de');
        } else if (event.direction === 'desc') {
          return y.localeCompare(x, 'de');
        }
      });
    } else if (event.active === 'interval') {
      groups.sort((a, b) => {
        const x = a.duration_appointment;
        const y = b.duration_appointment;
        if (event.direction === 'asc') {
          return x > y ? 1 : -1;
        } else if (event.direction === 'desc') {
          return x < y ? 1 : -1;
        }
      });
      if (event.direction === '') {
        this.dataSource.data = this.allGroup;
      } else {
        this.dataSource.data = groups;
      }
    }
    this.dataSource.data = groups;
  }
}
