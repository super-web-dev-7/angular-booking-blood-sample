import {Component, HostListener, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isTablet = false;
  constructor(
    public breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    this.isTablet = this.breakpointObserver.isMatched('(max-width: 1023px)');
  }

  @HostListener('window:resize', [])
  private onResize = () => {
    this.isTablet = this.breakpointObserver.isMatched('(max-width: 1023px)');
  }

}
