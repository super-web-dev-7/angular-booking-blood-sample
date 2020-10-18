import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../service/auth/auth.service';
import {Router} from '@angular/router';
import {SharedService} from '../../../service/shared/shared.service';

@Component({
  selector: 'app-patient-left-sidebar',
  templateUrl: './patient-left-sidebar.component.html',
  styleUrls: ['./patient-left-sidebar.component.scss']
})
export class PatientLeftSidebarComponent implements OnInit {

  @Output() closeSide = new EventEmitter();

  constructor(
    public authService: AuthService,
    public router: Router,
    private sharedService: SharedService
  ) { }
  ngOnInit(): void {
  }

  close = () => {
    this.closeSide.emit(false);
  }

  dashboard = () => {
    this.router.navigateByUrl('/patient').then(r => {
      this.sharedService.patientLeft.emit();
      this.close();
    });
  }

  newAppointment = () => {
    this.sharedService.patientPopup.emit('new');
    this.close();
  }

}
