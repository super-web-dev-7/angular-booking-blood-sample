import {Component, HostListener, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {AuthService} from '../../service/auth/auth.service';
import {Router} from '@angular/router';
import {SharedService} from '../../service/shared/shared.service';

@Component({
  selector: 'app-doctor-layout',
  templateUrl: './doctor-layout.component.html',
  styleUrls: ['./doctor-layout.component.scss']
})
export class DoctorLayoutComponent implements OnInit {
  isOpen = true;
  isMobile = false;
  isTablet = false;
  currentUser: any;
  isRightSidebarOpen = false;
  openMedicalHistory = false;
  openContactHistory = false;
  openPatientCall = false;
  openCheckContact = false;
  openCallPatient = false;
  openPatientInquiry = false;
  openRightMenu = false;
  openPatientAnswer = false;
  viewAnamnes = false;
  checkAnamnes = false;
  viewAppointment = false;
  tHistory = false;

  constructor(
    public breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    private sharedService: SharedService,
    public router: Router
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
    this.openMedicalHistory = false;
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    if (this.isTablet || this.isMobile) {
      this.isOpen = false;
    }
    this.sharedService.answer.subscribe(res => {
      if (res === 'medical') {
        this.openMedicalHistory = true;
      } else if (res === 'contact') {
        this.openContactHistory = true;
      } else {
        this.openPatientCall = true;
      }
    });
    this.sharedService.closeHistory.subscribe(res => {
      this.openMedicalHistory = false;
      this.openContactHistory = false;
      this.openPatientCall = false;
      this.openCallPatient = false;
      this.openCheckContact = false;
    });
    this.sharedService.check.subscribe(res => {
      if (res === 'v-contact') {
        this.openCheckContact = true;
      } else {
        this.openCallPatient = true;
      }
    });
    this.sharedService.tabletSide.subscribe(res => {
      if (res === 'inquiry') {
        this.openPatientInquiry = true;
      } else if (res === 'answer') {
        this.openPatientAnswer = true;
      } else if (res === 'v-anam') {
        this.viewAnamnes = true;
      } else if (res === 'c-anam') {
        this.checkAnamnes = true;
      } else if (res === 'v-appointment') {
        this.viewAppointment = true;
      }
      this.isRightSidebarOpen = true;
    });
    this.sharedService.tabletLeftSide.subscribe(res => {
      this.tHistory = true;
    });
  }

  setOpen = ($event: any) => {
    this.isOpen = true;
  }

  setRightSideOpen = (event) => {
    this.isRightSidebarOpen = event;
    this.openRightMenu = true;
  }

  closeRightSide = (event) => {
    this.isRightSidebarOpen = event;
    this.openPatientInquiry = false;
    this.openPatientAnswer = false;
    this.viewAnamnes = false;
    this.checkAnamnes = false;
    this.viewAppointment = false;
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
