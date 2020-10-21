import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-change-package',
  templateUrl: './change-package.component.html',
  styleUrls: ['./change-package.component.scss']
})
export class ChangePackageComponent implements OnInit {
  packages = [
    {id: 1, name: 'Package1'},
    {id: 2, name: 'Package2'},
    {id: 3, name: 'Package3'},
  ];
  selectedPackage = null;
  isValid = false;
  constructor(
    private dialogRef: MatDialogRef<ChangePackageComponent>
  ) { }

  ngOnInit(): void {
  }

  close = () => {
    this.dialogRef.close(false);
  }

  selectPackage = (id) => {
    this.selectedPackage = id;
  }
}
