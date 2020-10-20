import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SharedService} from '../../../../../../service/shared/shared.service';

@Component({
  selector: 'app-call-patient',
  templateUrl: './call-patient.component.html',
  styleUrls: ['./call-patient.component.scss']
})
export class CallPatientComponent implements OnInit {

  PatientCallForm: FormGroup;
  public districtSearchControl = new FormControl();
  allStaticDistrict = [];
  constructor(
    private sharedService: SharedService,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.PatientCallForm = this.formBuilder.group({
      model: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  close = () => {
    this.sharedService.closeHistory.emit('call');
  }

  submit = () => {
  }
}
