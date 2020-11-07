import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-medical-question-show',
  templateUrl: './medical-question-show.component.html',
  styleUrls: ['./medical-question-show.component.scss']
})
export class MedicalQuestionShowComponent implements OnInit {

  @Input() item;
  @Input() showDetailId;
  @Input() showDetail;
  @Output() openHistoryEmitter = new EventEmitter();
  gender = {
    Male: 'Männlich',
    Female: 'Weiblich',
    Divers: 'Divers'
  };
  medical: any;
  constructor() { }

  ngOnInit(): void {
    this.medical = this.item.medicalQuestion;
  }

  openHistory = (item) => {
    this.openHistoryEmitter.emit(item);
  }

}
