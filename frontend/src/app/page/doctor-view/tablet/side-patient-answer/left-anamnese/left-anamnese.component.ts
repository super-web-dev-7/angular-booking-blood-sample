import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../../../../service/shared/shared.service';

@Component({
  selector: 'app-left-anamnese',
  templateUrl: './left-anamnese.component.html',
  styleUrls: ['./left-anamnese.component.scss']
})
export class LeftAnamneseComponent implements OnInit {

  constructor(
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
  }

  close = () => {
    this.sharedService.closeHistory.emit('t-anams');
  }
}
