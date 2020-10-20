import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SharedService} from '../../../../service/shared/shared.service';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-side-check-anamnes',
  templateUrl: './side-check-anamnes.component.html',
  styleUrls: ['./side-check-anamnes.component.scss']
})
export class SideCheckAnamnesComponent implements OnInit {
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

  openRecall = () => {
    if (this.isMobile) {
      this.close();
      this.sharedService.answer.emit('call');
    } else {
      this.sharedService.tabletLeftSide.emit('t-recall');
    }
  }


  openMessage = () => {
    if (this.isMobile) {
      this.close();
    } else {
      this.sharedService.tabletLeftSide.emit('t-mail');
    }
  }

  submit = () => {
    this.isSuccess = true;
  }
}
