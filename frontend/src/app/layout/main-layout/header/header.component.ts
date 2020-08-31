import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../../service/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() isMobile;
  @Output() setOpen = new EventEmitter();
  currentUser: any;

  constructor(
    public authService: AuthService
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
  }

  openSidebar = () => {
    this.setOpen.emit(true);
  }
}
