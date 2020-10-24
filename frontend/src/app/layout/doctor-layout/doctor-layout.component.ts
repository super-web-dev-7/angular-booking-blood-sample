import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import {SharedService} from '../../service/shared/shared.service';
import {AuthService} from '../../service/auth/auth.service';
import {SessionExpireAlertComponent} from '../../components/session-expire-alert/session-expire-alert.component';


@Component({
  selector: 'app-doctor-layout',
  templateUrl: './doctor-layout.component.html',
  styleUrls: ['./doctor-layout.component.scss']
})
export class DoctorLayoutComponent implements OnInit, OnDestroy {
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
  tAnamnes = false;
  tMessage = false;
  tRecall = false;
  subsVar: any;
  appointmentId = null;
  answerPopupData = null;
  patientAnswerData = null;
  callbackId = null;

  constructor(
    public breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    private sharedService: SharedService,
    public router: Router,
    public dialog: MatDialog
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
    this.subsVar = this.authService.showExpireAlertSubject.subscribe(value => {
      if (value) {
        this.dialog.open(SessionExpireAlertComponent, {disableClose: true});
      }
    });
    this.openMedicalHistory = false;
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    if (this.isTablet || this.isMobile) {
      this.isOpen = false;
    }
    this.sharedService.answer.subscribe(res => {
      if (res.title === 'medical') {
        this.openMedicalHistory = true;
        this.openContactHistory = false;
        this.openPatientCall = false;
      } else if (res.title === 'contact') {
        this.openContactHistory = true;
        this.openMedicalHistory = false;
        this.openPatientCall = false;
      } else if (res.title === 'call') {
        this.openPatientCall = true;
        this.openMedicalHistory = false;
        this.openContactHistory = false;
      }
      this.answerPopupData = res.data;
    });
    this.sharedService.closeHistory.subscribe(res => {
      this.openMedicalHistory = false;
      this.openContactHistory = false;
      this.openPatientCall = false;
      this.openCallPatient = false;
      this.openCheckContact = false;
      this.tHistory = false;
      this.tAnamnes = false;
      this.tRecall = false;
      this.tMessage = false;
      this.appointmentId = null;
      this.answerPopupData = null;
      this.callbackId = null;
      this.patientAnswerData = null;
    });
    this.sharedService.check.subscribe(res => {
      if (res) {
        if (res.title === 'v-contact') {
          this.openCheckContact = true;
          this.openCallPatient = false;
          this.appointmentId = res.appointmentId;
        } else {
          this.openCallPatient = true;
          this.openCheckContact = false;
        }
      }
    });
    this.sharedService.tabletSide.subscribe(res => {
      if (res) {
        if (res.title === 'inquiry') {
          this.openPatientInquiry = true;
        } else if (res.title === 'answer') {
          this.openPatientAnswer = true;
          this.callbackId = res.callbackId;
        } else if (res.title === 'v-anam') {
          this.viewAnamnes = true;
        } else if (res.title === 'c-anam') {
          this.checkAnamnes = true;
          this.appointmentId = res.appointmentId;
        } else if (res.title === 'v-appointment') {
          this.viewAppointment = true;
          this.appointmentId = res.appointmentId;
        }
        this.isRightSidebarOpen = true;
      }
    });
    this.sharedService.tabletLeftSide.subscribe(res => {
      if (res.title === 't-history') {
        this.tHistory = true;
        this.tAnamnes = false;
        this.tRecall = false;
        this.tMessage = false;
      } else if (res.title === 't-anamnes') {
        this.tAnamnes = true;
        this.tRecall = false;
        this.tMessage = false;
        this.tHistory = false;
      } else if (res.title === 't-recall') {
        this.tRecall = true;
        this.tMessage = false;
        this.tHistory = false;
        this.tAnamnes = false;
      } else if (res.title === 't-mail') {
        this.tMessage = true;
        this.tHistory = false;
        this.tAnamnes = false;
        this.tRecall = false;
      }
      this.patientAnswerData = res.data;
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

  setRightSideOpen = (event) => {
    this.isRightSidebarOpen = event;
    this.openRightMenu = true;
  }

  closeRightSide = (event) => {
    this.isRightSidebarOpen = false;
    this.openPatientInquiry = false;
    this.openPatientAnswer = false;
    this.viewAnamnes = false;
    this.checkAnamnes = false;
    this.viewAppointment = false;
    this.openRightMenu = false;
    this.appointmentId = null;
    this.answerPopupData = null;
    this.callbackId = null;
    this.patientAnswerData = null;
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
