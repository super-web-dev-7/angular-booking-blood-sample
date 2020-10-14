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

  constructor(
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditAnamnesisComponent>
  ) { }

  ngOnInit(): void {
    this.editAnamsForm = this.formBuilder.group({
      name: [this.data?.name, Validators.required],
      model: [this.data?.model, Validators.required],
      isActive: [this.data ? this.data?.isActive : false, Validators.required]
    });
  }

  submit = () => {
    this.saved = true;
  }

  close = () => {
    this.dialogRef.close(false);
  }

}
