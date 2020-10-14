import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Router} from '@angular/router';

import {AuthService} from '../../service/auth/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  isOpen = true;
  isRightSidebarOpen = false;
  isMobile = false;
  currentUser: any;

  constructor(
    breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    public router: Router
  ) {
    breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.TabletPortrait
    ]).subscribe(result => {
      this.isOpen = !result.matches;
      this.isMobile = result.matches;
    });
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
  }

  setOpen = ($event: any) => {
    this.isOpen = true;
  }

  setRightOpen = (event) => {
    this.isRightSidebarOpen = event;
  }

  closeRightSide = (event) => {
    this.isRightSidebarOpen = event;
  }

  menuClick = (link) => {
    if (this.isMobile) {
      this.isOpen = false;
      setTimeout(() => {
        this.router.navigateByUrl(link);
      }, 500);
    } else {
      this.router.navigateByUrl(link);
    }
  }
}
