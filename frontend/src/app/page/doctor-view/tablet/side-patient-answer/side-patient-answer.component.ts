import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
  constructor(
    public sharedService: SharedService,
    public breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.isSuccess = false;
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    this.sharedService.closeHistory.subscribe(res => {
      this.isAnamnes = false;
      this.isSideHistory = false;
    });
  }

  close = () => {
    this.closeSide.emit(false);
  }

  openSideHistory = () => {
    this.close();
    if (this.isMobile) {
      this.sharedService.answer.emit('contact');
    } else {
      this.sharedService.tabletLeftSide.emit('t-history');
      this.isSideHistory = true;
      this.isAnamnes = false;
    }
  }

  openAnamneses = () => {
    this.close();
    if (this.isMobile) {
      this.sharedService.answer.emit('medical');
    } else {
      this.sharedService.tabletLeftSide.emit('t-anamnes');
      this.isAnamnes = true;
      this.isSideHistory = false;
    }
  }

  openRecall = () => {
    this.close();
    if (this.isMobile) {
      this.sharedService.answer.emit('call');
    } else {
      this.sharedService.tabletLeftSide.emit('t-recall');
    }
  }

  openMessage = () => {
    this.close();
    if (this.isMobile) {
    } else {
      this.sharedService.tabletLeftSide.emit('t-mail');
    }
  }

  submit = () => {
    this.isSuccess = true;
  }

}
