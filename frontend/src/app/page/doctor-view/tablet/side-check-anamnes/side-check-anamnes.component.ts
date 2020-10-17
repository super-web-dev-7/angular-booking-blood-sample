import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SharedService} from '../../../../service/shared/shared.service';

@Component({
  selector: 'app-side-check-anamnes',
  templateUrl: './side-check-anamnes.component.html',
  styleUrls: ['./side-check-anamnes.component.scss']
})
export class SideCheckAnamnesComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  isAnamnes = false;
  isSideHistory = false;
  isSuccess = false;
  constructor(
    public sharedService: SharedService
  ) { }
  ngOnInit(): void {
    this.isSuccess = false;
  }

  close = () => {
    this.closeSide.emit(false);
  }
  openSideHistory = () => {
    this.sharedService.tabletLeftSide.emit('t-history');
    this.isSideHistory = true;
    this.isAnamnes = false;
  }

  openRecall = () => {
    this.sharedService.tabletLeftSide.emit('t-recall');
  }

  openMessage = () => {
    this.sharedService.tabletLeftSide.emit('t-mail');
  }

  submit = () => {
    this.isSuccess = true;
  }
}
