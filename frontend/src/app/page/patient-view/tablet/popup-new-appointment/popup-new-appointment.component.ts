import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SharedService} from '../../../../service/shared/shared.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-popup-new-appointment',
  templateUrl: './popup-new-appointment.component.html',
  styleUrls: ['./popup-new-appointment.component.scss']
})
export class PopupNewAppointmentComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  @Input() isMobile;
  @Input() isTablet;
  appointmentForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private sharedService: SharedService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.appointmentForm = this.formBuilder.group({
      zipcode: ['', Validators.required],
    });
  }

  close = () => {
    this.router.navigateByUrl('/patient');
    this.closeSide.emit();
  }

  arrangeAppointment = () => {
    this.close();
    this.sharedService.patientPopup.emit('arrange');
  }
}
