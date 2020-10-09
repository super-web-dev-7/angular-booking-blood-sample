import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-answer-inquiry',
  templateUrl: './answer-inquiry.component.html',
  styleUrls: ['./answer-inquiry.component.scss']
})
export class AnswerInquiryComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AnswerInquiryComponent>
  ) { }

  ngOnInit(): void {
  }

  openSuccess = () => {
    this.dialogRef.close(true);
  }

  afterClosed = (dialogRef) => {
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
