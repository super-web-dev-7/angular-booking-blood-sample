import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../../../../../service/shared/shared.service';

@Component({
  selector: 'app-contact-history-left',
  templateUrl: './contact-history-left.component.html',
  styleUrls: ['./contact-history-left.component.scss']
})
export class ContactHistoryLeftComponent implements OnInit {
  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
  }

  close = () => {
    this.sharedService.closeHistory.emit('contact');
  }

}
