import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-edit-anamnesis',
  templateUrl: './edit-anamnesis.component.html',
  styleUrls: ['./edit-anamnesis.component.scss']
})
export class EditAnamnesisComponent implements OnInit {
  editAnamsForm;
  public districtSearchControl = new FormControl();
  allStaticDistrict = [];

  constructor() { }

  ngOnInit(): void {
  }

}
