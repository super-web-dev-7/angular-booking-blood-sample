import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-district',
  templateUrl: './new-district.component.html',
  styleUrls: ['./new-district.component.scss']
})
export class NewDistrictComponent implements OnInit {

  additionalZipCodeCount = [];
  additionalZipCode = [];
  constructor() { }

  ngOnInit(): void {
  }

  addZipCode = () => {
    this.additionalZipCodeCount.push(this.additionalZipCodeCount.length);
  }

}
