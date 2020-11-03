import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpService} from '../../../../service/http/http.service';
import {URL_JSON} from '../../../../utils/url_json';

@Component({
  selector: 'app-edit-anamnesis',
  templateUrl: './edit-anamnesis.component.html',
  styleUrls: ['./edit-anamnesis.component.scss']
})

export class EditAnamnesisComponent implements OnInit {
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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditAnamnesisComponent>,
    public httpService: HttpService
  ) {
  }

  ngOnInit(): void {
    this.saved = false;
    this.editAnamsForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      gender: [null, Validators.required],
      age: [null, Validators.required],
      height: [null, Validators.required],
      weight: [null, Validators.required],
      disease: [null]
    });
    this.httpService.get(URL_JSON.APPOINTMENT + '/getAppointmentWithQuestionById/' + this.data?.appointmentId).subscribe((res: any) => {
      this.displayData = res;
      if (res.length > 0) {
        this.setValues(res[0]);
      }
    });
  }

  setValues = (data) => {
    this.f.firstName.setValue(data.firstName);
    this.f.lastName.setValue(data.lastName);
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

  get f(): any {
    return this.editAnamsForm.controls;
  }

  submit = () => {
    if (this.editAnamsForm.invalid) {
      return;
    }
    const data = {
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      gender: this.f.gender.value,
      age: this.f.age.value,
      height: this.f.height.value,
      weight: this.f.weight.value,
      disease: this.f.disease.value,
      ...this.selectValues,
      ...this.data
    };
    this.httpService.post(URL_JSON.PATIENT + '/createMedicalQuestion', data).subscribe((res: any) => {
      this.saved = true;
    });
  }

  selectDiseaseStatus = (value) => {
    this.selectValues.takeMedication = value;
    if (value) {
      this.f.disease.setValidators([Validators.required]);
    } else {
      this.f.disease.setValidators(null);
    }
    this.f.disease.updateValueAndValidity();
  }

  close = () => {
    this.dialogRef.close(false);
  }
}
