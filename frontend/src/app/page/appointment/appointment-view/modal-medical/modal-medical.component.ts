import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-medical',
  templateUrl: './modal-medical.component.html',
  styleUrls: ['./modal-medical.component.scss']
})
export class ModalMedicalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
