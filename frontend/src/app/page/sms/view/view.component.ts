import {Component, Inject, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {HttpService} from '../../../service/http/http.service';
import {URL_JSON} from '../../../utils/url_json';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor(
    public httpService: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'time-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/time.svg')
    );
  }

  ngOnInit(): void {
  }

  sendManual = () => {
    this.httpService.post(URL_JSON.BASE + '/sendSMS', this.data).subscribe((res: any) => {
    });
  }
}
