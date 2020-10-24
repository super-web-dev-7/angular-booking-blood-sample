import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpService} from '../../service/http/http.service';
import {URL_JSON} from '../../utils/url_json';

@Component({
  selector: 'app-ag-dashboard',
  templateUrl: './ag-dashboard.component.html',
  styleUrls: ['./ag-dashboard.component.scss']
})
export class AgDashboardComponent implements OnInit {

  showDetailPeriod = false;
  // data: any;
  label = [
    'Bestätigte Termine', 'Offene Termine'
  ];
  labelClass = ['light-green-color', 'pink-color'];
  data = [
  ];

  constructor(
    public httpService: HttpService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'custom-calendar',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/calendar.svg')
    );
  }

  ngOnInit(): void {
    this.httpService.get(URL_JSON.BASE + 'dashboard/ag-admin').subscribe((res: any) => {
      this.data.push({
        label: 'Termine gesamp',
        detailData: [
          {color: '#50E3C2', value: this.getNumberFromString(res.total.confirm_count), icon: 'done'},
          {color: '#F389CC', value: this.getNumberFromString(res.total.open_date_count), icon: 'feeling'},
        ]
      });
      for (const agency of res.agency) {
        this.data.push({
          label: agency.agencyName,
          detailData: [
            {color: '#50E3C2', value: this.getNumberFromString(agency.confirm_count), icon: 'done'},
            {color: '#F389CC', value: this.getNumberFromString(agency.open_date_count), icon: 'feeling'},
          ]
        });
      }
    });
  }

  getNumberFromString = (value) => {
    return parseInt(value, 10);
  }

}
