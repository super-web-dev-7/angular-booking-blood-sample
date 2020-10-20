import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../../../../../service/shared/shared.service';

@Component({
  selector: 'app-view-contact-history',
  templateUrl: './view-contact-history.component.html',
  styleUrls: ['./view-contact-history.component.scss']
})
export class ViewContactHistoryComponent implements OnInit {
  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
  }

  close = () => {
    this.sharedService.closeHistory.emit('v-contact');
  }

}
