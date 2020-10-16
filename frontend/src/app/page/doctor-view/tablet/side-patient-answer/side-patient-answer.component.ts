import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SharedService} from '../../../../service/shared/shared.service';

@Component({
  selector: 'app-side-patient-answer',
  templateUrl: './side-patient-answer.component.html',
  styleUrls: ['./side-patient-answer.component.scss']
})
export class SidePatientAnswerComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  constructor(
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
  }

  close = () => {
    this.closeSide.emit(false);
  }

  openSideHistory = () => {
    this.sharedService.tabletLeftSide.emit();
  }

}
