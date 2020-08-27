import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {AuthService} from '../../service/auth/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  isOpen = true;
  isMobile = false;
  currentUser: any;

  constructor(
    breakpointObserver: BreakpointObserver,
    public authService: AuthService
  ) {
    breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.TabletPortrait
    ]).subscribe(result => {
      console.log(result);
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
}
