import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-anamnesis',
  templateUrl: './edit-anamnesis.component.html',
  styleUrls: ['./edit-anamnesis.component.scss']
})

export class EditAnamnesisComponent implements OnInit {
  editAnamsForm: FormGroup;
  saved = false;
  public districtSearchControl = new FormControl();
  allStaticDistrict = [];
  ageRange = new Array(65);
  heightRange = new Array(70);
  weightRange = new Array(100);
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
    private dialogRef: MatDialogRef<EditAnamnesisComponent>
  ) { }

  ngOnInit(): void {
    this.editAnamsForm = this.formBuilder.group({
      name: [null, Validators.required],
      gender: [null, Validators.required],
      male: [null, Validators.required],
      age: [null, Validators.required],
      height: [null, Validators.required],
      weight: [null, Validators.required],
      disease: [null, Validators.required]
    });
  }

  submit = () => {
    this.saved = true;
    console.log(this.selectValues);
  }

  close = () => {
    this.dialogRef.close(false);
  }

}
