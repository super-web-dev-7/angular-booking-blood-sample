import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../service/auth/auth.service';
import {AG_Sidebar, DoctorSidebar, Sidebar} from '../../../utils/sidebar';

@Component({
  selector: 'app-doctor-sidebar',
  templateUrl: './doctor-sidebar.component.html',
  styleUrls: ['./doctor-sidebar.component.scss']
})
export class DoctorSidebarComponent implements OnInit {

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
    } else if (this.currentUser.role === 'Doctor') {
      this.sidebar = DoctorSidebar;
    }
    this.selected = '/' + this.router.url.split('/')[1];
  }

  changeRoute = (selected, link) => {
    this.menuClick.emit(link);
    this.selected = selected;
  }

}
