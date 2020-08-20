import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../../service/http/http.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  selectedGroup = null;
  selectedStatus = null;
  isActive = false;
  groups = [
    {
      id: 1,
      name: 'Arbeitsgruppe 1'
    },
    {
      id: 2,
      name: 'Arbeitsgruppe 2'
    },
    {
      id: 3,
      name: 'Arbeitsgruppe 3'
    }
  ];
  statuses = [
    {
      id: 1,
      name: 'Inaktiv'
    },
    {
      id: 2,
      name: 'Öffentlich'
    },
    {
      id: 3,
      name: 'Intern'
    }
  ];

  newPackageForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public httpRequest: HttpService
  ) { }

  ngOnInit(): void {
    this.newPackageForm = this.formBuilder.group({
      name: [null, Validators.required],
      number: [null, Validators.required],
      price: [null, Validators.required],
      special_price: [null, Validators.required]
    });
  }

  selectGroup = (id) => {
    this.selectedGroup = id;
  }

  selectStatus = (id) => {
    this.selectedStatus = id;
  }

  get f() {
    return this.newPackageForm.controls;
  }

  newPackage = () => {
    const newPackageData = {
      name: this.f.name.value,
      number: this.f.number.value,
      price: this.f.price.value,
      special_price: this.f.special_price.value,
      isActive: this.isActive,
      group: this.selectedGroup,
      status: this.selectedStatus
    };
    console.log(newPackageData);
  }

}
