import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../../../../../service/shared/shared.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-patient-recall',
  templateUrl: './patient-recall.component.html',
  styleUrls: ['./patient-recall.component.scss']
})
export class PatientRecallComponent implements OnInit {
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