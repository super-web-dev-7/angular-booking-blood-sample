import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-side-patient-inquiry',
  templateUrl: './side-patient-inquiry.component.html',
  styleUrls: ['./side-patient-inquiry.component.scss']
})
export class SidePatientInquiryComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  close = () => {
    this.closeSide.emit(false);
  }

}
