import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import {AuthService} from '../../service/auth/auth.service';
import {SessionExpireAlertComponent} from '../../components/session-expire-alert/session-expire-alert.component';


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  isOpen = true;
  isMobile = false;
  currentUser: any;
  subsVar: any;

  constructor(
    breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    public router: Router,
    public dialog: MatDialog
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
    this.subsVar = this.authService.showExpireAlertSubject.subscribe(value => {
      if (value) {
        this.dialog.open(SessionExpireAlertComponent, {disableClose: true});
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subsVar) {
      this.subsVar.unsubscribe();
    }
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
