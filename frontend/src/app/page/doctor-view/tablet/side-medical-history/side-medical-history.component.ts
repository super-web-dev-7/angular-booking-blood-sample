import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-side-medical-history',
  templateUrl: './side-medical-history.component.html',
  styleUrls: ['./side-medical-history.component.scss']
})
export class SideMedicalHistoryComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  close = () => {
    this.closeSide.emit(false);
  }
}
