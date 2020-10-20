import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../../../../service/shared/shared.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-anamnes-check',
  templateUrl: './anamnes-check.component.html',
  styleUrls: ['./anamnes-check.component.scss']
})
export class AnamnesCheckComponent implements OnInit {
  isCheckContact = false;
  customText = '';
  content = null;
  Editor = ClassicEditor;
  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.sharedService.closeHistory.subscribe(res => {
      this.isCheckContact = false;
    });
  }

  openCheckContact = () => {
    this.isCheckContact = true;
    this.sharedService.check.emit('v-contact');
  }

  openCallPatient = () => {
    this.isCheckContact = false;
    this.sharedService.check.emit('call-patient');
  }

}
