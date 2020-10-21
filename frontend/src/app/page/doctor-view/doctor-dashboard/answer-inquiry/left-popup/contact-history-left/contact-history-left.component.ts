import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../../../../../service/shared/shared.service';
import {historyMockData} from '../../../../../../utils/mock_data';

@Component({
  selector: 'app-contact-history-left',
  templateUrl: './contact-history-left.component.html',
  styleUrls: ['./contact-history-left.component.scss']
})
export class ContactHistoryLeftComponent implements OnInit {
  historyData: any;
  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.historyData = historyMockData;
  }

  close = () => {
    this.sharedService.closeHistory.emit('contact');
  }

}
