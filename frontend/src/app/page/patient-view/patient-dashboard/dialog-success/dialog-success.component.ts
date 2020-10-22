import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-success',
  templateUrl: './dialog-success.component.html',
  styleUrls: ['./dialog-success.component.scss']
})
export class DialogSuccessComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DialogSuccessComponent>,
  ) { }

  ngOnInit(): void {
  }

  close = () => {
    this.dialogRef.close();
  }
}
