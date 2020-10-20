import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../service/auth/auth.service';
import {Router} from '@angular/router';
import {BreakpointObserver} from '@angular/cdk/layout';
import {SharedService} from '../../../service/shared/shared.service';

@Component({
  selector: 'app-doctor-header',
  templateUrl: './doctor-header.component.html',
  styleUrls: ['./doctor-header.component.scss']
})
export class DoctorHeaderComponent implements OnInit {
  isTablet = false;
  @Input() isMobile;
  @Output() setOpen = new EventEmitter();
  @Output() setRightSideOpen = new EventEmitter();
  @Output() setLeftSideOpen = new EventEmitter();
  currentUser: any;
  url: any;

  constructor(
    public authService: AuthService,
    public router: Router,
    public breakpointObserver: BreakpointObserver,
    private sharedService: SharedService
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    this.url = location.pathname;
    this.sharedService.test.subscribe(res => {
      this.url = location.pathname;
    });
  }

  openSidebar = () => {
    this.setOpen.emit(true);
  }

  logout = () => {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  laboratory = () => {
    this.router.navigateByUrl('/doctor/laboratory-report').then(r => {
      this.url = location.pathname;
    });
  }

  dashboard = () => {
    this.router.navigateByUrl('/doctor').then(r => {
      this.url = location.pathname;
    });
  }

  openRightSidebar = () => {
    this.setRightSideOpen.emit(true);
  }

  @HostListener('window:resize', [])
  private onResize = () => {
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    this.url = location.pathname;
  }
}
