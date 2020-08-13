import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() isMobile;
  @Output() setOpen = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log(this.isMobile);
  }

  openSidebar = () => {
    this.setOpen.emit(true);
  }
}
