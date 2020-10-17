import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SharedService} from '../../../../service/shared/shared.service';

@Component({
  selector: 'app-side-patient-answer',
  templateUrl: './side-patient-answer.component.html',
  styleUrls: ['./side-patient-answer.component.scss']
})
export class SidePatientAnswerComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  isAnamnes = false;
  isSideHistory = false;
  isSuccess = false;
  constructor(
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.isSuccess = false;
    this.sharedService.closeHistory.subscribe(res => {
      this.isAnamnes = false;
      this.isSideHistory = false;
    });
  }

  close = () => {
    this.closeSide.emit(false);
  }

  openSideHistory = () => {
    this.sharedService.tabletLeftSide.emit('t-history');
    this.isSideHistory = true;
    this.isAnamnes = false;
  }

  openAnamneses = () => {
    this.sharedService.tabletLeftSide.emit('t-anamnes');
    this.isAnamnes = true;
    this.isSideHistory = false;
  }

  openRecall = () => {
    this.sharedService.tabletLeftSide.emit('t-recall');
  }

  openMessage = () => {
    this.sharedService.tabletLeftSide.emit('t-mail');
  }

  submit = () => {
    this.isSuccess = true;
  }

}
