import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../../../../../service/shared/shared.service';

@Component({
  selector: 'app-medical-history-left',
  templateUrl: './medical-history-left.component.html',
  styleUrls: ['./medical-history-left.component.scss']
})
export class MedicalHistoryLeftComponent implements OnInit {
  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
  }

  close = () => {
    this.sharedService.closeHistory.emit('medical');
  }
}
