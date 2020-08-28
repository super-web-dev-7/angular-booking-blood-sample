import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {NewDistrictComponent} from '../new-district/new-district.component';
import {URL_JSON} from '../../../utils/url_json';
import {HttpService} from '../../../service/http/http.service';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class DistrictComponent implements OnInit {

  displayedColumns: string[] = ['no', 'name', 'zip-code', 'active', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  currentPage = 0;
  pageSize = 5;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  selectedDeleteItem: number = null;
  allDistrict: any;
  filterValue = null;
  orderStatus = {
    active: '',
    direction: ''
  };

  constructor(
    public router: Router,
    public dialog: MatDialog,
    public httpService: HttpService
  ) {
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    const url = this.router.url.split('/');
    if (url[3] === 'new') {
      this.openDialog();
    }
    this.httpService.get(URL_JSON.DISTRICT + '/get').subscribe((res: any) => {
      for (const item of res) {
        item.zipcode = JSON.parse(item.zipcode);
      }
      this.dataSource.data = res;
      this.allDistrict = res;
    });
  }

  onPaginateChange = ($event: PageEvent) => {
    this.currentPage = $event.pageIndex;
    this.pageSize = $event.pageSize;
  }

  filter = () => {
    this.dataSource.data = this.allDistrict.filter(item => {
      return item.name.includes(this.filterValue)
        || JSON.stringify(item.zipcode).includes(this.filterValue);
    });
  }

  delete = (id) => {
    this.selectedDeleteItem = id;
  }

  deleteItem = () => {
    this.httpService.delete(URL_JSON.DISTRICT + '/delete/' + this.selectedDeleteItem).subscribe(res => {
      const dataSource = this.dataSource.data;
      const removedIndex = dataSource.findIndex(item => {
        return item.id === this.selectedDeleteItem;
      });
      dataSource.splice(removedIndex, 1);
      this.dataSource.data = dataSource;
    });
  }

  openDialog = () => {
    const dialogRef = this.dialog.open(NewDistrictComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl('calendar/district/overview');
    });
  }

  setActive = (event, id) => {
    const data = {
      isActive: event.checked
    };
    this.httpService.update(URL_JSON.DISTRICT + '/update/' + id, data).subscribe(res => {
    });
  }

  editItem = (id) => {
    const dataSource = this.dataSource.data;
    const data = dataSource.find(item => {
      return item.id === id;
    });
    const dialogRef = this.dialog.open(NewDistrictComponent, {
      width: '900px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.zipcode = JSON.parse(result.zipcode);
        const index = this.allDistrict.findIndex(item => item.id === result.id);
        const district = this.allDistrict[index];
        this.allDistrict[index] = {...district, ...result};
        this.dataSource.data = this.allDistrict;
      }
    });
  }

  onSort = (event) => {
    this.orderStatus = event;
    const districts = [...this.allDistrict];
    if (event.active === 'active') {
      districts.sort((a, b) => {
        const x = a.isActive;
        const y = b.isActive;
        if (event.direction === 'asc') {
          return x < y ? 1 : -1;
        } else if (event.direction === 'desc') {
          return x > y ? 1 : -1;
        }
      });
      if (event.direction === '') {
        this.dataSource.data = this.allDistrict;
      } else {
        this.dataSource.data = districts;
      }
    } else if (event.active === 'zip-code') {
      districts.sort((a, b) => {
        const x = JSON.stringify(a.zipcode);
        const y = JSON.stringify(b.zipcode);
        if (event.direction === 'desc') {
          return x < y ? 1 : -1;
        } else if (event.direction === 'asc') {
          return x > y ? 1 : -1;
        }
      });
      if (event.direction === '') {
        this.dataSource.data = this.allDistrict;
      } else {
        this.dataSource.data = districts;
      }
    }
  }
}
