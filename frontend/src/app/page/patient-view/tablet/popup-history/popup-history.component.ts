import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-popup-history',
  templateUrl: './popup-history.component.html',
  styleUrls: ['./popup-history.component.scss']
})
export class PopupHistoryComponent implements OnInit {
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
