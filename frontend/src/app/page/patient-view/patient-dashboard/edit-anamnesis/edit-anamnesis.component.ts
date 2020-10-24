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
    smoking: true,
    alcohol: false,
    takeMedication: true,
    heartAttack: true,
    previousIllness: true,
    additionalInfo: true
  };

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
      name: [null, Validators.required],
      gender: [null, Validators.required],
      age: [null, Validators.required],
      height: [null, Validators.required],
      weight: [null, Validators.required],
      disease: [null, Validators.required]
    });
  }

  get f(): any {
    return this.editAnamsForm.controls;
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
      ...this.data
    };
    this.httpService.post(URL_JSON.PATIENT + '/createMedicalQuestion', data).subscribe((res: any) => {
      this.saved = true;
    });
  }

  close = () => {
    this.dialogRef.close(false);
  }
}
