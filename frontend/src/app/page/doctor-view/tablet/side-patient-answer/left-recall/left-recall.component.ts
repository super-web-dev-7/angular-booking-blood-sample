import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SharedService} from '../../../../../service/shared/shared.service';

@Component({
  selector: 'app-left-recall',
  templateUrl: './left-recall.component.html',
  styleUrls: ['./left-recall.component.scss']
})
export class LeftRecallComponent implements OnInit {

  PatientCallForm: FormGroup;
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
