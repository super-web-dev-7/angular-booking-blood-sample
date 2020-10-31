import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../service/auth/auth.service';
import {PatientSidebar} from '../../../utils/sidebar';

@Component({
  selector: 'app-sidebar-patient',
  templateUrl: './sidebar-patient.component.html',
  styleUrls: ['./sidebar-patient.component.scss']
})
export class SidebarPatientComponent implements OnInit {
  sidebar;
  selected;
  currentUser;
  @Output() menuClick = new EventEmitter();

  constructor(
    public router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(value => {
      this.currentUser = value;
      if (this.currentUser.role === 'Patient') {
        this.sidebar = PatientSidebar;
      }
    });
    this.selected = '/' + this.router.url.split('/')[1];
  }

  changeRoute = (selected, link) => {
    this.menuClick.emit(link);
    this.selected = selected;
  }

}
