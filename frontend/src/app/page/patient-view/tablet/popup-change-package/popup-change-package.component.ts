import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-popup-change-package',
  templateUrl: './popup-change-package.component.html',
  styleUrls: ['./popup-change-package.component.scss']
})
export class PopupChangePackageComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  isShow = false;
  constructor() { }

  ngOnInit(): void {
    this.isShow = false;
  }

  close = () => {
    this.closeSide.emit(false);
  }

  moreItems = () => {
    this.isShow = !this.isShow;
  }
}
