import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../../service/http/http.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {URL_JSON} from '../../../utils/url_json';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  isAddAdminPopup = false;
  selectedDoctors = [];
  selectedGroup = null;
  doctors = [];
  groups = [];
  groupForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public httpService: HttpService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.groupForm = this.formBuilder.group({
      name: [this.data?.name, Validators.required],
    });
    this.httpService.get(URL_JSON.USER + '/get?role=Doctor').subscribe((res: any) => {
      this.doctors = res;
    });
    this.httpService.get(URL_JSON.GROUP + '/get').subscribe((res: any) => {
      this.groups = res;
    });
    this.selectedGroup = this.data ? this.data?.group_id : 0;
    this.selectedDoctors = this.data ? this.data?.doctors_id : [];
  }

  get f() {
    return this.groupForm.controls;
  }

  showAddAdminPopup = () => {
    this.isAddAdminPopup = !this.isAddAdminPopup;
  }

  selectAdmin = (id) => {
    if (this.selectedDoctors.includes(id)) {
      this.selectedDoctors.splice(this.selectedDoctors.indexOf(id), 1);
    } else {
      this.selectedDoctors.push(id);
    }
  }

  selectCalendar = (id) => {
    this.selectedGroup = id;
  }

  close = () => {
    this.dialogRef.close();
  }

  onSubmit = () => {
    if (this.groupForm.invalid) {
      return;
    }
    if (!this.selectedDoctors && !this.selectedGroup) {
      return;
    }

    const data = {
      name: this.f.name.value,
      doctors_id: this.selectedDoctors,
      group_id: this.selectedGroup
    };
    if (this.data) {
      this.httpService.update(URL_JSON.AGENCY + '/update/' + this.data.id, data).subscribe(result => {
        this.dialogRef.close(result);
      });
    } else {
      this.httpService.create(URL_JSON.AGENCY, data).subscribe(() => {
        this.dialogRef.close();
      });
    }
    // const data = {
    //   name: this.f.name.value,
    //   isActive: this.f.isActive.value,
    //   admin: JSON.stringify(this.selectedDoctors),
    //   calendar_id: this.selectedGroup
    // };
    // if (this.data) {
    //   this.httpService.update(URL_JSON.GROUP + '/update/' + this.data.id, data).subscribe((result) => {
    //     this.dialogRef.close(result[0]);
    //   });
    // } else {
    //   this.httpService.create(URL_JSON.GROUP, data).subscribe(res => {
    //     this.dialogRef.close();
    //   });
    // }
  }

}
