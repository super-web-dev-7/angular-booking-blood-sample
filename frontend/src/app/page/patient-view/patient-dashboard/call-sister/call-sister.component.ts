import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-call-sister',
  templateUrl: './call-sister.component.html',
  styleUrls: ['./call-sister.component.scss']
})
export class CallSisterComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<CallSisterComponent>
  ) { }

  ngOnInit(): void {
  }

  close = () => {
    this.dialogRef.close(false);
  }

}
