import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../service/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.scss']
})
export class PatientHeaderComponent implements OnInit {
  @Input() isMobile;
  @Output() setOpen = new EventEmitter();
  @Output() setRightOpen = new EventEmitter();
  currentUser: any;

  constructor(
    public authService: AuthService,
    public router: Router
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit(): void {
  }

  openSidebar = () => {
    this.setOpen.emit(true);
  }

  openRightSidebar = () => {
    this.setRightOpen.emit(true);
  }
}
