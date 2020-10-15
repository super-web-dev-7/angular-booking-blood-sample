import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../service/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit {
  @Output() closeSide = new EventEmitter();

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  close = () => {
    this.closeSide.emit(false);
  }

  logout = () => {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
