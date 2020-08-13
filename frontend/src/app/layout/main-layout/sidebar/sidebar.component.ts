import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Sidebar} from '../../../utils/sidebar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  sidebar;
  selected;

  constructor(
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.sidebar = Sidebar;
    this.selected = '/' + this.router.url.split('/')[1];
  }

  changeRoute = (link) => {
    console.log(link);
    this.selected = link;
  }
}
