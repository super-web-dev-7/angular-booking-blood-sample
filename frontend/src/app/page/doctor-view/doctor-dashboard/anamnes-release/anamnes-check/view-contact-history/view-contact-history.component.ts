import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../../../../../service/shared/shared.service';
import {historyMockData} from '../../../../../../utils/mock_data';

@Component({
  selector: 'app-view-contact-history',
  templateUrl: './view-contact-history.component.html',
  styleUrls: ['./view-contact-history.component.scss']
})
export class ViewContactHistoryComponent implements OnInit {
  historyData: any;
  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.historyData = historyMockData;
  }

  close = () => {
    this.sharedService.closeHistory.emit('v-contact');
  }

}
