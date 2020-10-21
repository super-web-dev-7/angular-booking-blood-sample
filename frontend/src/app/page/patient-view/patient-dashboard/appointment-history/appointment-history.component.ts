import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {historyMockData} from '../../../../utils/mock_data';

@Component({
  selector: 'app-appointment-history',
  templateUrl: './appointment-history.component.html',
  styleUrls: ['./appointment-history.component.scss']
})
export class AppointmentHistoryComponent implements OnInit {
  historyData: any;
  constructor(
    private dialogRef: MatDialogRef<AppointmentHistoryComponent>
  ) { }

  ngOnInit(): void {
    this.historyData = historyMockData;
  }

  close = () => {
    this.dialogRef.close(false);
  }
}
