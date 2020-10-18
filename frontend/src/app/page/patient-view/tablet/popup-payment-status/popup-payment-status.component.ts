import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-popup-payment-status',
  templateUrl: './popup-payment-status.component.html',
  styleUrls: ['./popup-payment-status.component.scss']
})
export class PopupPaymentStatusComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  close = () => {
    this.closeSide.emit(false);
  }

}
