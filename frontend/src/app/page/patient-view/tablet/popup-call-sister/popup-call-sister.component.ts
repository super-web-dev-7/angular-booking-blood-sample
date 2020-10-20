import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-popup-call-sister',
  templateUrl: './popup-call-sister.component.html',
  styleUrls: ['./popup-call-sister.component.scss']
})
export class PopupCallSisterComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  @Input() isMobile;
  @Input() isTablet;
  constructor() { }

  ngOnInit(): void {
  }

  close = () => {
    this.closeSide.emit(false);
  }
}
