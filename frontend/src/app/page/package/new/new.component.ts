import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {HttpService} from '../../../service/http/http.service';
import {URL_JSON} from '../../../utils/url_json';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  selectedGroup = null;
  selectedStatus = null;
  isActive = false;
  content = null;
  groups = [];
  statuses = [
    {
      name: 'Inaktiv',
      value: 'Inactive'
    },
    {
      name: 'Öffentlich',
      value: 'Public'
    },
    {
      name: 'Intern',
      value: 'Intern'
    }
  ];

  newPackageForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public httpService: HttpService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.newPackageForm = this.formBuilder.group({
      name: [this.data?.name, Validators.required],
      number: [this.data?.number, Validators.required],
      price: [this.data?.price, Validators.required],
      specialPrice: [this.data?.special_price]
    });
    if (this.data) {
      this.selectedGroup = this.data.group_id;
      this.selectedStatus = this.data.status;
      if (this.data.special_price) {
        this.isActive = true;
      }
      this.content = this.data.content;
    }

    this.httpService.get(URL_JSON.GROUP + '/get').subscribe((res: any) => {
      this.groups = res;
    });
  }

  selectGroup = (id) => {
    this.selectedGroup = id;
  }

  selectStatus = (id) => {
    this.selectedStatus = id;
  }

  get f(): any {
    return this.newPackageForm.controls;
  }

  onSubmit = () => {
    if (this.newPackageForm.invalid) {
      return;
    }

    if (this.isActive && !this.f.specialPrice.value) {
      return;
    }
    const newPackageData = {
      name: this.f.name.value,
      number: this.f.number.value,
      price: this.f.price.value,
      special_price: this.isActive ? this.f.specialPrice.value : null,
      isActive: this.isActive,
      group_id: this.selectedGroup,
      status: this.selectedStatus,
      content: this.content
    };
    if (this.data) {
      this.httpService.update(URL_JSON.PACKAGE + '/update/' + this.data.id, newPackageData).subscribe(res => {
        this.dialogRef.close(res);
      });
    } else {
      this.httpService.create(URL_JSON.PACKAGE, newPackageData).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

  close = () => {
    this.dialogRef.close();
  }

}
