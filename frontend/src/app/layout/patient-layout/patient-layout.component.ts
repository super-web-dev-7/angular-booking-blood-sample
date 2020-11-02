import {ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import {AuthService} from '../../service/auth/auth.service';
import {SharedService} from '../../service/shared/shared.service';
import {SessionExpireAlertComponent} from '../../components/session-expire-alert/session-expire-alert.component';

@Component({
  selector: 'app-patient-layout',
  templateUrl: './patient-layout.component.html',
  styleUrls: ['./patient-layout.component.scss']
})
export class PatientLayoutComponent implements OnInit, OnDestroy {
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
  title: string;
  titleEnd: string;
  subsVar: any;
  appointmentID = null;
  addressInfo = null;

  constructor(
    public authService: AuthService,
    public router: Router,
    public breakpointObserver: BreakpointObserver,
    private sharedService: SharedService,
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {

    breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.TabletPortrait
    ]).subscribe(result => {
      this.isOpen = !result.matches;
    });
    this.authService.currentUser.subscribe(value => {
      this.currentUser = value;
    });
  }

  ngOnInit(): void {
    this.subsVar = this.authService.showExpireAlertSubject.subscribe(value => {
      if (value) {
        this.dialog.open(SessionExpireAlertComponent, {disableClose: true});
      }
    });
    this.isOpen = true;
    this.title = 'dashboard';
    this.titleEnd = '';
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    if (this.isTablet || this.isMobile) {
      this.isOpen = false;
    }
    this.sharedService.patientPopup.subscribe(res => {
      if (res.title === 'cancel') {
        this.openCancelAppointment = true;
        this.title = 'Termin';
        this.titleEnd = 'stornieren';
      } else if (res.title === 'move') {
        this.openMove = true;
        this.title = 'Termin';
        this.titleEnd = 'verschieben';
      } else if (res.title === 'edit') {
        this.openEdit = true;
        this.title = 'Anamnese';
        this.titleEnd = 'bearbeiten';
      } else if (res.title === 'callback') {
        this.openCallback = true;
        this.title = 'Rückrufbitte';
        this.titleEnd = 'Arzt';
      } else if (res.title === 'sister') {
        this.openCallSister = true;
        this.title = 'Schwester';
        this.titleEnd = 'anrufen';
      } else if (res.title === 'package') {
        this.openPackage = true;
        this.title = 'Paket';
        this.titleEnd = 'wechseln';
      } else if (res.title === 'payment') {
        this.openPayment = true;
        this.title = 'Zahlungs';
        this.titleEnd = 'status';
      } else if (res.title === 'new') {
        this.openNewPopup = true;
        this.title = 'Neuer';
        this.titleEnd = 'Termin';
      } else if (res.title === 'arrange') {
        this.openArrange = true;
        this.title = 'Neuer';
        this.titleEnd = 'Termin';
        this.addressInfo = res.data;
      } else if (res.title === 'history') {
        this.openHistory = true;
        this.title = 'Termin';
        this.titleEnd = 'Historie';
      }
      this.isRightSidebarOpen = true;
      this.appointmentID = res.data?.appointmentId;
      this.cdRef.detectChanges();
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

  setRightOpen = (event) => {
    this.isRightSidebarOpen = true;
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
    this.title = 'dashboard';
    this.titleEnd = '';
    this.appointmentID = null;
    this.addressInfo = null;
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
