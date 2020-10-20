import {Component, OnInit, Output} from '@angular/core';
import {SharedService} from '../../../../../service/shared/shared.service';

@Component({
  selector: 'app-left-history-popup',
  templateUrl: './left-history-popup.component.html',
  styleUrls: ['./left-history-popup.component.scss']
})
export class LeftHistoryPopupComponent implements OnInit {
  constructor(
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
  }

  close = () => {
    this.sharedService.closeHistory.emit('t-history');
  }

}
