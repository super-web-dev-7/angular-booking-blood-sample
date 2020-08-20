import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-new-district',
  templateUrl: './new-district.component.html',
  styleUrls: ['./new-district.component.scss']
})
export class NewDistrictComponent implements OnInit {

  additionalZipCodeCount = [];
  additionalZipCode = [];
  newDistrictForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.newDistrictForm = this.formBuilder.group({
    });
  }

  addZipCode = () => {
    this.additionalZipCodeCount.push(this.additionalZipCodeCount.length);
  }

}
