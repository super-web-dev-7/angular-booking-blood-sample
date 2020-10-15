import {Component, Inject, OnInit} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

import {HttpService} from '../../../service/http/http.service';
import {URL_JSON} from '../../../utils/url_json';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  selectedShipment = null;
  selectedReceiver = null;
  templateForm: FormGroup;

  shipments = [
    {
      id: 1,
      name: 'SMS'
    },
    {
      id: 2,
      name: 'E-Mail'
    }
  ];

  receivers = [
    {
      id: 1,
      name: 'Patient'
    },
    {
      id: 2,
      name: 'Schwester'
    },
    {
      id: 3,
      name: 'Arzt'
    }
  ];

  actions = [];
  allActions = [];

  Editor = ClassicEditor;
  template = {
    editorData: ''
  };

  constructor(
    public formBuilder: FormBuilder,
    public httpService: HttpService,
    public dialogRef: MatDialogRef<any>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.templateForm = this.formBuilder.group({
      name: [this.data?.subject, Validators.required],
      assign: [this.data?.assign, Validators.required],
      message: [this.data?.message, Validators.required]
    });
    this.httpService.get(URL_JSON.TEMPLATE + '/getActions').subscribe((res: any) => {
      this.allActions = res;
      this.selectedShipment = this.data ? this.data.type === 'SMS' ? 1 : 2 : null;
      this.selectedReceiver = this.data?.receiver;
      if (this.data) {
        this.selectActions();
        this.f.assign.setValue(this.data.assign);
      }
    });
  }

  get f(): any {
    return this.templateForm.controls;
  }

  selectShipment = (id) => {
    this.selectedShipment = id;
    this.selectActions();
  }

  selectReceiver = (id) => {
    this.selectedReceiver = id;
    this.selectActions();
  }

  selectActions = () => {
    if (this.selectedReceiver && this.selectedShipment) {
      const shipment = this.selectedShipment === 1 ? 'sms' : 'email';
      const receiver = this.selectedReceiver === 1 ? 'patient' : this.selectedReceiver === 2 ? 'nurse' : 'doctor';
      this.actions = this.allActions.filter(item => item[shipment] && item[receiver]);
    }
  }

  create = () => {
    if (this.templateForm.invalid) {
      return;
    }
    if (!this.selectedReceiver || !this.selectedShipment) {
      return;
    }
    const data = {
      subject: this.f.name.value,
      type: this.selectedShipment,
      receiver: this.selectedReceiver,
      assign: this.f.assign.value,
      message: this.f.message.value
    };
    if (this.data) {
      this.httpService.update(URL_JSON.TEMPLATE + '/update/' + this.data.id, data).subscribe(() => {
        const response = Object.assign(data, {id: this.data.id});
        this.dialogRef.close(response);
      }, error => {
        this.snackBar.open(error.error.message, '', {duration: 2000});
      });
    } else {
      this.httpService.create(URL_JSON.TEMPLATE, data).subscribe(() => {
        this.dialogRef.close();
      }, error => {
        this.snackBar.open(error.error.message, '', {duration: 2000});
      });
    }
  }

  close = () => {
    this.dialogRef.close();
  }

}
