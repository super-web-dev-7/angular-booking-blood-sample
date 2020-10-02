import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {URL_JSON} from '../../../utils/url_json';
import {HttpService} from '../../../service/http/http.service';

@Component({
  selector: 'app-new-district',
  templateUrl: './new-district.component.html',
  styleUrls: ['./new-district.component.scss']
})
export class NewDistrictComponent implements OnInit {

  // additionalZipCodeCount = [];
  // additionalZipCode = [];
  districtForm: FormGroup;
  public districtSearchControl = new FormControl();
  allStaticDistrict = [];
  allStaticDistrict$ = [];

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    public httpService: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.districtForm = this.formBuilder.group({
      name: [this.data?.name, Validators.required],
      model: [this.data?.model, Validators.required],
      isActive: [this.data ? this.data?.isActive : false, Validators.required]
    });
    this.httpService.get(URL_JSON.DISTRICT + '/get_model').subscribe((res: any) => {
      this.allStaticDistrict = res;
      this.allStaticDistrict$ = res;
    });
    if (this.data) {
      // for (let i  = 0; i < this.data.zipcode.length - 1; i++) {
      //   this.additionalZipCodeCount.push(this.additionalZipCodeCount.length);
      // }
      // const zipcode = [...this.data.zipcode];
      // zipcode.shift();
      // this.additionalZipCode = zipcode;
    }
    this.districtSearchControl.valueChanges.subscribe(() => {
      let search = this.districtSearchControl.value;
      search = search.toLowerCase();
      this.allStaticDistrict = this.allStaticDistrict$.filter(item => item.name.toLowerCase().indexOf(search) > -1);
    });
  }

  get f(): any {
    return this.districtForm.controls;
  }
  //
  // addZipCode = () => {
  //   this.additionalZipCodeCount.push(this.additionalZipCodeCount.length);
  //   this.additionalZipCode.push({from: '', to: ''});
  // }

  onSubmit = () => {
    if (this.districtForm.invalid) {
      return;
    }
    // const zipcode = [
    //   {
    //     from: this.f.from.value,
    //     to: this.f.to.value
    //   }
    // ];
    // for (const item of this.additionalZipCode) {
    //   if (item.from === '' || item.to === '') {
    //     continue;
    //   }
    //   zipcode.push({from: item.from, to: item.to});
    // }
    const data = {
      name: this.f.name.value,
      model: this.f.model.value,
      isActive: this.f.isActive.value,
      // zipcode: JSON.stringify(zipcode)
    };
    if (this.data) {
      this.httpService.update(URL_JSON.DISTRICT + '/update/' + this.data.id, data).subscribe(res => {
        // const response = Object.assign(data, {id: this.data.id});
        this.dialogRef.close(res);
      });
    } else {
      this.httpService.create(URL_JSON.DISTRICT, data).subscribe(res => {
        this.dialogRef.close(res);
      });
    }
  }

  close = () => {
    this.dialogRef.close();
  }

  // onChangeValue = (event, index, type) => {
  //   if (type === 0) {
  //     this.additionalZipCode[index].from = event.target.value;
  //   } else {
  //     this.additionalZipCode[index].to = event.target.value;
  //   }
  // }
}
