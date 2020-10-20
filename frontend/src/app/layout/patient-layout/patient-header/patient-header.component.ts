import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../service/auth/auth.service';
import {Router} from '@angular/router';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.scss']
})
export class PatientHeaderComponent implements OnInit {
  @Input() isMobile;
  @Output() setOpen = new EventEmitter();
  @Output() setRightOpen = new EventEmitter();
  currentUser: any;
  isTablet = false;

  constructor(
    public authService: AuthService,
    public router: Router,
    public breakpointObserver: BreakpointObserver,
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
  }

  openSidebar = () => {
    this.setOpen.emit(true);
  }

  openRightSidebar = () => {
    this.setRightOpen.emit(true);
  }

  @HostListener('window:resize', [])
  private onResize = () => {
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
  }
}
