import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<PaymentStatusComponent>
  ) { }

  ngOnInit(): void {
  }

  close = () => {
    this.dialogRef.close(false);
  }

}
