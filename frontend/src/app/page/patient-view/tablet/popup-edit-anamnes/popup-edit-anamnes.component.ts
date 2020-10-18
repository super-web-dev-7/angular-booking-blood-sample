import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-popup-edit-anamnes',
  templateUrl: './popup-edit-anamnes.component.html',
  styleUrls: ['./popup-edit-anamnes.component.scss']
})
export class PopupEditAnamnesComponent implements OnInit {
  @Output() closeSide = new EventEmitter();
  editAnamsForm: FormGroup;
  saved = false;
  public districtSearchControl = new FormControl();
  allStaticDistrict = [];
  constructor(
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.editAnamsForm = this.formBuilder.group({
      name: ['', Validators.required],
      model: ['', Validators.required],
      isActive: ['', Validators.required]
    });
  }

  close = () => {
    this.closeSide.emit(false);
  }

  submit = () => {
    this.saved = true;
  }

}
