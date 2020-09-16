import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {HttpService} from '../../../service/http/http.service';
import {URL_JSON} from '../../../utils/url_json';
import {NewAdditionalComponent} from '../new-additional/new-additional.component';

@Component({
  selector: 'app-overview-additional',
  templateUrl: './overview-additional.component.html',
  styleUrls: ['./overview-additional.component.scss']
})
export class OverviewAdditionalComponent implements OnInit {

  displayedColumns: string[] = ['no', 'name', 'number', 'assign', 'price', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  currentPage = 0;
  pageSize = 5;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  selectedDeleteItem: number = null;

  allPackages: any;
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
    if (url[2] === 'new-additional') {
      this.openDialog();
    }
    this.httpService.get(URL_JSON.ADDITIONAL_PACKAGE + '/get').subscribe((res: any) => {
      console.log(res);
      this.dataSource.data = res;
      this.allPackages = res;
    });
  }

  onPaginateChange = ($event: PageEvent) => {
    this.currentPage = $event.pageIndex;
    this.pageSize = $event.pageSize;
  }

  delete = (id) => {
    this.selectedDeleteItem = id;
  }

  deleteItem = () => {
    this.httpService.delete(URL_JSON.PACKAGE + '/delete/' + this.selectedDeleteItem).subscribe(() => {
      const index = this.allPackages.findIndex(item => item.id === this.selectedDeleteItem);
      this.allPackages.splice(index, 1);
      this.dataSource.data = this.allPackages;
      this.selectedDeleteItem = null;
    });
  }

  openDialog = () => {
    const dialogRef = this.dialog.open(NewAdditionalComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl('package/overview-additional');
    });
  }

  update = (data) => {
    const dialogRef = this.dialog.open(NewAdditionalComponent, {
      width: '600px',
      data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.allPackages.findIndex(item => item.id === result.id);
        this.allPackages[index] = result;
        this.dataSource.data = this.allPackages;
      }
    });
  }

  filter = () => {
    console.log(this.filterValue);
    this.dataSource.data = this.allPackages.filter(item => {
      return item.name.includes(this.filterValue) ||
        item.number.toString().includes(this.filterValue) ||
        item.price.toString().includes(this.filterValue) ||
        JSON.stringify(item.special_price).includes(this.filterValue) ||
        item.package.name.includes(this.filterValue) ||
        item.status.includes(this.filterValue);
    });
  }

  onSort = (event) => {
    this.orderStatus = event;
    const packages = [...this.allPackages];
    if (event.active === 'assign') {
      packages.sort((a, b) => {
        const x = a.package.name;
        const y = b.package.name;
        if (event.direction === 'asc') {
          return x.localeCompare(y, 'de');
        } else if (event.direction === 'desc') {
          return y.localeCompare(x, 'de');
        }
      });
    }
    if (event.direction === '') {
      this.dataSource.data = this.allPackages;
    } else {
      this.dataSource.data = packages;
    }
  }

}
