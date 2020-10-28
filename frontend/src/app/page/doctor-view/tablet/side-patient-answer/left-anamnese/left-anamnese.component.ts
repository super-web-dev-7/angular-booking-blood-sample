import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from '../../../../../service/shared/shared.service';
import {HttpService} from '../../../../../service/http/http.service';
import {URL_JSON} from '../../../../../utils/url_json';

@Component({
  selector: 'app-left-anamnese',
  templateUrl: './left-anamnese.component.html',
  styleUrls: ['./left-anamnese.component.scss']
})
export class LeftAnamneseComponent implements OnInit {
  @Input() data;
  medicalQuestion: any;
  constructor(
    public sharedService: SharedService,
    public httpService: HttpService
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentWithQuestionById/' + this.data.appointmentId).subscribe((res: any) => {
        if (res.length > 0) {
          this.medicalQuestion = res[0];
        }
      });
    }
  }

  close = () => {
    this.sharedService.closeHistory.emit('t-anams');
  }
}
