import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {AuthService} from '../../service/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-doctor-layout',
  templateUrl: './doctor-layout.component.html',
  styleUrls: ['./doctor-layout.component.scss']
})
export class DoctorLayoutComponent implements OnInit {
  isOpen = true;
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
