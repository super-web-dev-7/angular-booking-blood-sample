import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';

import {AG_Sidebar, Sidebar} from '../../../utils/sidebar';
import {AuthService} from '../../../service/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  sidebar;
  selected;
  currentUser;
  @Output() menuClick = new EventEmitter();

  constructor(
    public router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    if (this.currentUser.role === 'Superadmin') {
      this.sidebar = Sidebar;
    } else if (this.currentUser.role === 'AG-Admin') {
      this.sidebar = AG_Sidebar;
    }
    this.selected = '/' + this.router.url.split('/')[1];
  }

  changeRoute = (selected, link) => {
    this.menuClick.emit(link);
    this.selected = selected;
  }
}
