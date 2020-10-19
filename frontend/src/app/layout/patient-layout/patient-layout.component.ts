import {Component, HostListener, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {AuthService} from '../../service/auth/auth.service';
import {Router} from '@angular/router';
import {SharedService} from '../../service/shared/shared.service';

@Component({
  selector: 'app-patient-layout',
  templateUrl: './patient-layout.component.html',
  styleUrls: ['./patient-layout.component.scss']
})
export class PatientLayoutComponent implements OnInit {
  isOpen = true;
  isTablet = true;
  isRightSidebarOpen = false;
  isMobile = false;
  currentUser: any;
  menuOpen = false;
  openCancelAppointment = false;
  openMove = false;
  openPackage = false;
  openCallback = false;
  openCallSister = false;
  openEdit = false;
  openPayment = false;
  openNewPopup = false;
  openNewAppointment = false;
  openArrange = false;
  openHistory = false;

  constructor(
    public authService: AuthService,
    public router: Router,
    public breakpointObserver: BreakpointObserver,
    private sharedService: SharedService,
  ) {

    breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.TabletPortrait
    ]).subscribe(result => {
      this.isOpen = !result.matches;
    });
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.isOpen = true;
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    if (this.isTablet || this.isMobile) {
      this.isOpen = false;
    }
    this.sharedService.patientPopup.subscribe(res => {
      if (res === 'cancel') {
        this.openCancelAppointment = true;
      } else if (res === 'move') {
        this.openMove = true;
      } else if (res === 'edit') {
        this.openEdit = true;
      } else if (res === 'callback') {
        this.openCallback = true;
      } else if (res === 'sister') {
        this.openCallSister = true;
      } else if (res === 'package') {
        this.openPackage = true;
      } else if (res === 'payment') {
        this.openPayment = true;
      } else if (res === 'new') {
        this.openNewPopup = true;
      } else if (res === 'arrange') {
        this.openArrange = true;
      } else if (res === 'history') {
        this.openHistory = true;
      }
      this.isRightSidebarOpen = true;
    });
  }

  setOpen = ($event: any) => {
    this.isOpen = true;
  }

  setRightOpen = (event) => {
    this.isRightSidebarOpen = event;
    this.menuOpen = true;
  }

  closeRightSide = (event) => {
    this.isRightSidebarOpen = false;
    this.openCancelAppointment = false;
    this.openMove = false;
    this.openEdit = false;
    this.openCallback = false;
    this.openCallSister = false;
    this.openPackage = false;
    this.openPayment = false;
    this.openNewPopup = false;
    this.menuOpen = false;
    this.openArrange = false;
    this.openHistory = false;
  }

  closeLeftSide = (event) => {
    this.isOpen = event;
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

  @HostListener('window:resize', [])
  private onResize = () => {
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    if (this.isTablet || this.isMobile) {
      this.isOpen = false;
    }
  }
}
