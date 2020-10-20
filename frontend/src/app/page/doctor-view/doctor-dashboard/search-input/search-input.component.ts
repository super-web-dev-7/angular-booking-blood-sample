import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
  }

  close = () => {
    this.dialogRef.close();
  }
}
