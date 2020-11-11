import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {NewComponent} from '../new/new.component';
import {URL_JSON} from '../../../utils/url_json';
import {HttpService} from '../../../service/http/http.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  displayedColumns: string[] = ['no', 'subject', 'type', 'receiver', 'assign', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  currentPage = 0;
  pageSize = 5;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  selectedDeleteItem: number = null;

  allTemplate: any;

  receivers = [
    {id: 1, name: 'Patient'},
    {id: 2, name: 'Schwester'},
    {id: 3, name: 'Arzt'},
    {id: 4, name: 'AG-Admin'}
  ];

  orderStatus = {
    active: '',
    direction: ''
  };

  filterValue = null;

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
    this.httpService.get(URL_JSON.TEMPLATE + '/get').subscribe((res: any) => {
      this.dataSource.data = res;
      this.allTemplate = res;
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
    this.httpService.delete(URL_JSON.TEMPLATE + '/delete/' + this.selectedDeleteItem).subscribe(res => {
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
      width: '900px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl('text/overview');
    });
  }

  editItem = (data) => {
    const dialogRef = this.dialog.open(NewComponent, {
      width: '900px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.type = result.type === 1 ? 'SMS' : 'E-Mail';
        const index = this.allTemplate.findIndex(item => item.id === result.id);
        const template = this.allTemplate[index];
        this.allTemplate[index] = {...template, ...result};
        this.dataSource.data = this.allTemplate;
      }
    });
  }

  onSort = (event) => {
    this.orderStatus = event;
  }

  filter = () => {
    this.dataSource.data = this.allTemplate.filter(item => {
      return item.subject.includes(this.filterValue)
        || item.type.includes(this.filterValue)
        || item.assign.includes(this.filterValue)
        || this.receivers[item.receiver - 1].name.includes(this.filterValue)
        ;
    });
  }

}
