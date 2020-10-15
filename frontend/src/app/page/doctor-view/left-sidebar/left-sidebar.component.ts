import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../service/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {

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
}
