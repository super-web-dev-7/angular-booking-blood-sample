import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-ag-dashboard',
  templateUrl: './ag-dashboard.component.html',
  styleUrls: ['./ag-dashboard.component.scss']
})
export class AgDashboardComponent implements OnInit {

  showDetailPeriod = false;

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'custom-calendar',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/calendar.svg')
    );
  }

  ngOnInit(): void {
  }

}
