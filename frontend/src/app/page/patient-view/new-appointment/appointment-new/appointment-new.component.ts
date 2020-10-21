import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-appointment-new',
  templateUrl: './appointment-new.component.html',
  styleUrls: ['./appointment-new.component.scss']
})
export class AppointmentNewComponent implements OnInit {
  packages = [
    {id: 1, name: 'Package1'},
    {id: 2, name: 'Package2'},
    {id: 3, name: 'Package3'},
  ];
  selectedPackage = null;
  isValid = false;
  constructor(
    private dialogRef: MatDialogRef<AppointmentNewComponent>
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
