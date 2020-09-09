import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {HttpService} from '../../../service/http/http.service';
import {URL_JSON} from '../../../utils/url_json';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  isAppointmentPopup = false;
  isPatientPopup = false;
  selectedDoctors = [];
  selectedGroup = null;
  doctors = [];
  groups = [];
  groupForm: FormGroup;
  // @ViewChild('formView') formView: ElementRef;
  // dialogHeight: any;

  constructor(
    public formBuilder: FormBuilder,
    public httpService: HttpService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'time-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/time.svg')
    );
  }

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
    this.selectedGroup = this.data ? this.data?.calendar_id : 0;
    this.selectedDoctors = this.data ? this.data?.admin : [];
    // this.dialogHeight = this.formView.nativeElement.offsetHeight;
  }

  get f() {
    return this.groupForm.controls;
  }

  showAppointmentPopup = (event) => {
    this.isAppointmentPopup = !this.isAppointmentPopup;
  }

  showPatientPopup = (event) => {
    this.isPatientPopup = !this.isPatientPopup;
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
