import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../../../../service/shared/shared.service';

@Component({
  selector: 'app-anamnes-check',
  templateUrl: './anamnes-check.component.html',
  styleUrls: ['./anamnes-check.component.scss']
})
export class AnamnesCheckComponent implements OnInit {
  isCheckContact = false;
  isCallPatient = false;
  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
  }

  openCheckContact = () => {
    this.isCheckContact = true;
    this.isCallPatient = true;
    this.sharedService.check.emit('v-contact');
  }

  openCallPatient = () => {
    this.isCallPatient = true;
    this.isCheckContact = false;
    this.sharedService.check.emit('call-patient');
  }

}
