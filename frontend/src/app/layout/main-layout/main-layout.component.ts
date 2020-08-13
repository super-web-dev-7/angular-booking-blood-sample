import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  isOpen = true;
  isMobile = false;

  constructor(
    breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet
    ]).subscribe(result => {
      this.isOpen = !result.matches;
      this.isMobile = result.matches;
    });
  }

  ngOnInit(): void {
  }

  setOpen = ($event: any) => {
    this.isOpen = true;
  }
}
