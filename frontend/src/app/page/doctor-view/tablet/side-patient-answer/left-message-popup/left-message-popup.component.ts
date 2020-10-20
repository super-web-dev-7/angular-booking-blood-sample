import {Component, HostListener, OnInit} from '@angular/core';
import {SharedService} from '../../../../../service/shared/shared.service';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-left-message-popup',
  templateUrl: './left-message-popup.component.html',
  styleUrls: ['./left-message-popup.component.scss']
})
export class LeftMessagePopupComponent implements OnInit {
  isMobile = false;
  isTablet = false;
  content = null;
  constructor(
    public breakpointObserver: BreakpointObserver,
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
  }

  close = () => {
    this.sharedService.closeHistory.emit('t-history');
  }

  @HostListener('window:resize', [])
  private onResize = () => {
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    this.isTablet = this.breakpointObserver.isMatched('(min-width: 768px') && this.breakpointObserver.isMatched('(max-width: 1023px)');
  }

}
