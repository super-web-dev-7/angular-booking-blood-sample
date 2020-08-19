import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {NewComponent} from '../new/new.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  displayedColumns: string[] = ['no', 'subject', 'art', 'receiver', 'assign', 'actions'];
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
    this.currentPage = $event.pageIndex;
    this.pageSize = $event.pageSize;
  }

  delete = (id) => {
    this.selectedDeleteItem = id;
  }

  deleteItem = () => {
    this.selectedDeleteItem = null;
  }

  openDialog = () => {
    const dialogRef = this.dialog.open(NewComponent, {
      width: '900px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl('text/overview');
    });
  }

}

const ELEMENT_DATA: any[] = [
  {
    id: 1,
    subject: 'Bezirk 1',
    art: 'E-Mail',
    receiver: 'Schwester',
    assign: 'Terminstornierung durch Patient'
  },
  {
    id: 2,
    subject: 'Bezirk 2',
    art: 'E-Mail',
    receiver: 'Schwester',
    assign: 'Terminstornierung durch Patient'
  },
  {
    id: 3,
    subject: 'Bezirk 3',
    art: 'E-Mail',
    receiver: 'Schwester',
    assign: 'Terminstornierung durch Patient'
  },
  {
    id: 4,
    subject: 'Bezirk 4',
    art: 'E-Mail',
    receiver: 'Schwester',
    assign: 'Terminstornierung durch Patient'
  }
];
