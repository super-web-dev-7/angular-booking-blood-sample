import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {NewComponent} from './new/new.component';
import {HttpService} from '../../service/http/http.service';
import {URL_JSON} from '../../utils/url_json';

@Component({
  selector: 'app-working-group',
  templateUrl: './working-group.component.html',
  styleUrls: ['./working-group.component.scss']
})
export class WorkingGroupComponent implements OnInit {

  displayedColumns: string[] = ['no', 'name', 'group_admin', 'calendar_resource', 'active', 'actions'];
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
