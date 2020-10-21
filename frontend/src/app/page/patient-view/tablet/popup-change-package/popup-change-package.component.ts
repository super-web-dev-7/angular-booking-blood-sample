import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-popup-change-package',
  templateUrl: './popup-change-package.component.html',
  styleUrls: ['./popup-change-package.component.scss']
})
export class PopupChangePackageComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  @Input() isMobile;
  @Input() isTablet;
  isShow = false;
  packages = [
    {id: 1, name: 'Package1'},
    {id: 2, name: 'Package2'},
  ];
  selectedPackage = null;
  isValid = false;
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

  selectPackage = (id) => {
    this.selectedPackage = id;
  }
}
