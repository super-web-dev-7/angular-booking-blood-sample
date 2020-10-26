import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from '../../../../../../service/shared/shared.service';
import {HttpService} from '../../../../../../service/http/http.service';
import {URL_JSON} from '../../../../../../utils/url_json';

@Component({
  selector: 'app-medical-history-left',
  templateUrl: './medical-history-left.component.html',
  styleUrls: ['./medical-history-left.component.scss']
})
export class MedicalHistoryLeftComponent implements OnInit {
  @Input() data;
  medicalQuestion: any;
  constructor(
    private sharedService: SharedService,
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
    this.sharedService.closeHistory.emit('medical');
  }
}
