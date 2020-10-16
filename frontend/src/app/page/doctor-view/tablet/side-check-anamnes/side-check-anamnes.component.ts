import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-side-check-anamnes',
  templateUrl: './side-check-anamnes.component.html',
  styleUrls: ['./side-check-anamnes.component.scss']
})
export class SideCheckAnamnesComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  close = () => {
    this.closeSide.emit(false);
  }

}
