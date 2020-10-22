import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {SharedService} from '../../../../service/shared/shared.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {HttpService} from '../../../../service/http/http.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {URL_JSON} from '../../../../utils/url_json';

@Component({
  selector: 'app-side-check-anamnes',
  templateUrl: './side-check-anamnes.component.html',
  styleUrls: ['./side-check-anamnes.component.scss']
})
export class SideCheckAnamnesComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  @Input() appointmentID;
  isAnamnes = false;
  isSideHistory = false;
  isSuccess = false;
  isMobile = false;
  displayData: any;
  constructor(
    public sharedService: SharedService,
    public breakpointObserver: BreakpointObserver,
    public httpService: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {
    this.isSuccess = false;
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 767px)');
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentWithQuestionById/' + this.appointmentID).subscribe((res: any) => {
      this.displayData = res[0];
    });
  }

  close = () => {
    this.closeSide.emit(false);
    this.sharedService.closeHistory.emit();
  }
  openSideHistory = () => {
    if (this.isMobile) {
      this.close();
      this.sharedService.answer.emit('contact');
    } else {
      this.sharedService.tabletLeftSide.emit('t-history');
      this.isSideHistory = true;
      this.isAnamnes = false;
    }
  }

  openRecall = () => {
    if (this.isMobile) {
      this.close();
      this.sharedService.answer.emit('call');
    } else {
      this.sharedService.tabletLeftSide.emit('t-recall');
      this.isSideHistory = false;
    }
  }


  openMessage = () => {
    if (this.isMobile) {
      this.close();
    } else {
      this.sharedService.tabletLeftSide.emit('t-mail');
      this.isSideHistory = false;
    }
  }

  submit = () => {
    this.isSuccess = true;
  }
}
