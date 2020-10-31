import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../../../service/http/http.service';
import {URL_JSON} from '../../../../utils/url_json';

@Component({
  selector: 'app-popup-edit-anamnes',
  templateUrl: './popup-edit-anamnes.component.html',
  styleUrls: ['./popup-edit-anamnes.component.scss']
})
export class PopupEditAnamnesComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  @Input() isMobile;
  @Input() isTablet;
  @Input() appointmentId;
  editAnamsForm: FormGroup;
  saved = false;
  ageRange = new Array(81);
  heightRange = new Array(140);
  weightRange = new Array(265);
  diseases = [
    'Gegen Diabetes', 'Gegen Bluthochdruck', 'Schilddrüsenüberfunktion', 'Schilddrüsenunterfunktion'
  ];
  selectValues = {
    smoking: false,
    alcohol: false,
    takeMedication: false,
    heartAttack: false,
    previousIllness: false,
    additionalInfo: false
  };
  displayData: any;
  constructor(
    public formBuilder: FormBuilder,
    public httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.editAnamsForm = this.formBuilder.group({
      name: [null, Validators.required],
      gender: [null, Validators.required],
      age: [null, Validators.required],
      height: [null, Validators.required],
      weight: [null, Validators.required],
      disease: [null, Validators.required]
    });
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentWithQuestionById/' + this.appointmentId).subscribe((res: any) => {
      this.displayData = res;
      if (res.length > 0) {
        this.setValues(res[0]);
      }
    });
  }

  get f(): any {
    return this.editAnamsForm.controls;
  }

  setValues = (data) => {
    this.f.name.setValue(data.patientFirstName + '' + data.patientLastName);
    this.f.gender.setValue(data.gender);
    this.f.age.setValue(data.age);
    this.f.height.setValue(data.height);
    this.f.weight.setValue(data.weight);
    this.f.disease.setValue(data.disease);
    this.selectValues = {
      smoking: data.smoking,
      alcohol: data.alcohol,
      takeMedication: data.takeMedication,
      heartAttack: data.heartAttack,
      previousIllness: data.previousIllness,
      additionalInfo: data.additionalInfo
    };
  }

  submit = () => {
    if (this.editAnamsForm.invalid) {
      return;
    }
    const data = {
      name: this.f.name.value,
      gender: this.f.gender.value,
      age: this.f.age.value,
      height: this.f.height.value,
      weight: this.f.weight.value,
      disease: this.f.disease.value,
      ...this.selectValues,
      appointmentId: this.appointmentId
    };
    this.httpService.post(URL_JSON.PATIENT + '/createMedicalQuestion', data).subscribe((res: any) => {
      this.saved = true;
    });
  }

  close = () => {
    this.closeSide.emit(false);
  }

}
