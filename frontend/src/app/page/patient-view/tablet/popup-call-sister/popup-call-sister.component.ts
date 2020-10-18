import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-popup-call-sister',
  templateUrl: './popup-call-sister.component.html',
  styleUrls: ['./popup-call-sister.component.scss']
})
export class PopupCallSisterComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  close = () => {
    this.closeSide.emit(false);
  }
}
