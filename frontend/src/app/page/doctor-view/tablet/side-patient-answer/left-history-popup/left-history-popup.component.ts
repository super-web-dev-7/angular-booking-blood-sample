import {Component, OnInit, Output} from '@angular/core';
import {SharedService} from '../../../../../service/shared/shared.service';
import {historyMockData} from '../../../../../utils/mock_data';

@Component({
  selector: 'app-left-history-popup',
  templateUrl: './left-history-popup.component.html',
  styleUrls: ['./left-history-popup.component.scss']
})
export class LeftHistoryPopupComponent implements OnInit {
  historyData: any;
  constructor(
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.historyData = historyMockData;
  }

  close = () => {
    this.sharedService.closeHistory.emit('t-history');
  }

}
