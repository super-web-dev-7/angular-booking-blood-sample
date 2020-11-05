import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SharedService} from '../../../../service/shared/shared.service';
import {Router} from '@angular/router';
import {HttpService} from '../../../../service/http/http.service';

@Component({
  selector: 'app-popup-new-appointment',
  templateUrl: './popup-new-appointment.component.html',
  styleUrls: ['./popup-new-appointment.component.scss']
})
export class PopupNewAppointmentComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  @Input() isMobile;
  @Input() isTablet;
  city = null;
  appointmentForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private sharedService: SharedService,
    public router: Router,
    public httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.appointmentForm = this.formBuilder.group({
      plz: [null, Validators.required],
    });
  }

  get f(): any {
    return this.appointmentForm.controls;
  }

  checkPostalCode = () => {
    this.httpService.checkPostalCodeForAppointment(this.f.plz.value).subscribe((res: any) => {
      if (!res) {
        this.f.plz.setErrors(Validators.required);
      } else {
        this.f.plz.setErrors(null);
        this.city = res.city;
      }
    });
  }

  close = (value) => {
    if (!value) {
      this.router.navigateByUrl('/patient');
    }
    this.closeSide.emit();
  }

  arrangeAppointment = () => {
    if (this.appointmentForm.invalid) {
      return;
    }
    this.close(true);
    const emitData = {
      title: 'arrange',
      data: {
        plz: this.f.plz.value,
        ort: this.city,
        appointmentId: null
      }
    };
    this.sharedService.patientPopup.emit(emitData);
  }
}
