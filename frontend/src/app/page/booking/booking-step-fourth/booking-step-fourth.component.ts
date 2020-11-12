import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-booking-step-fourth',
  templateUrl: './booking-step-fourth.component.html',
  styleUrls: ['./booking-step-fourth.component.scss']
})
export class BookingStepFourthComponent implements OnInit {

  @Input() data;

  constructor(
    public router: Router
  ) {
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  getTimeDuration = (time, duration) => {
    return moment(time).format('DD.MM.YYYY HH:mm') + '-' + moment(time + duration).format('HH:mm');
  }

  getPayDate = () => {
    return moment(new Date()).format('DD.MM.YYYY');
  }

  login = () => {
    console.log('login');
    // this.router.navigate(['/login'], {queryParams: {email: 'supermanit0517@gmail.com', password: 'test123', appointmentId: 1}});
    this.router.navigate(['/login'], {
      queryParams: {
        email: this.data.patient.email,
        password: this.data.patient.password,
        appointmentId: this.data.appointment.id
      }
    });
  }
}
