import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../service/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-doctor-header',
  templateUrl: './doctor-header.component.html',
  styleUrls: ['./doctor-header.component.scss']
})
export class DoctorHeaderComponent implements OnInit {


  @Input() isMobile;
  @Output() setOpen = new EventEmitter();
  @Output() setRightOpen = new EventEmitter();
  currentUser: any;

  constructor(
    public authService: AuthService,
    public router: Router
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
  }

  openSidebar = () => {
    this.setOpen.emit(true);
  }

  logout = () => {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
