import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../../../../service/shared/shared.service';

@Component({
  selector: 'app-left-message-popup',
  templateUrl: './left-message-popup.component.html',
  styleUrls: ['./left-message-popup.component.scss']
})
export class LeftMessagePopupComponent implements OnInit {

  constructor(
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
  }

  close = () => {
    this.sharedService.closeHistory.emit('t-history');
  }

}
