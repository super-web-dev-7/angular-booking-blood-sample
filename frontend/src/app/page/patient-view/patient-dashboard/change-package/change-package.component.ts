import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-change-package',
  templateUrl: './change-package.component.html',
  styleUrls: ['./change-package.component.scss']
})
export class ChangePackageComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ChangePackageComponent>
  ) { }

  ngOnInit(): void {
  }

  close = () => {
    this.dialogRef.close(false);
  }
}
