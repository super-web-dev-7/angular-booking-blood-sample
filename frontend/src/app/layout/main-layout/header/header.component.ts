import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../../../service/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

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
  }
}
