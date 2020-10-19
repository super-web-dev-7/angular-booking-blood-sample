import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {SharedService} from '../../../../service/shared/shared.service';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-side-patient-answer',
  templateUrl: './side-patient-answer.component.html',
  styleUrls: ['./side-patient-answer.component.scss']
})
export class SidePatientAnswerComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  isAnamnes = false;
  isSideHistory = false;
  isSuccess = false;
  isMobile = false;
  isTablet = false;
  constructor(
    public sharedService: SharedService,
    public breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.isSuccess = false;
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
    this.sharedService.closeHistory.subscribe(res => {
      this.isAnamnes = false;
      this.isSideHistory = false;
    });
  }

  close = () => {
    this.closeSide.emit(false);
  }

  openSideHistory = () => {
    if (this.isMobile) {
      this.close();
      this.sharedService.answer.emit('contact');
    } else {
      this.sharedService.tabletLeftSide.emit('t-history');
      this.isSideHistory = true;
      this.isAnamnes = false;
    }
  }

  openAnamneses = () => {
    if (this.isMobile) {
      this.close();
      this.sharedService.answer.emit('medical');
    } else {
      this.sharedService.tabletLeftSide.emit('t-anamnes');
      this.isAnamnes = true;
      this.isSideHistory = false;
    }
  }

  openRecall = () => {
    if (this.isMobile) {
      this.close();
      this.sharedService.answer.emit('call');
    } else {
      this.sharedService.tabletLeftSide.emit('t-recall');
      this.isSideHistory = false;
    }
  }

  openMessage = () => {
    if (this.isMobile) {
      this.close();
      this.sharedService.tabletLeftSide.emit('t-mail');
    } else {
      this.sharedService.tabletLeftSide.emit('t-mail');
      this.isSideHistory = false;
    }
  }

  submit = () => {
    this.isSuccess = true;
  }
  @HostListener('window:resize', [])
  private onResize = () => {
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
  }

}
