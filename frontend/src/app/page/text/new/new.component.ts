import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  selectedShipment = null;
  selectedReceiver = null;
  shipments = [
    {
      id: 1,
      name: 'SMS'
    },
    {
      id: 2,
      name: 'E-Mail'
    }
  ];
  receivers = [
    {
      id: 1,
      name: 'Maria Synowzik'
    },
    {
      id: 2,
      name: 'Karin Blattip'
    },
    {
      id: 3,
      name: 'Ernst Waltersdorf'
    }
  ];

  values = [
    {value: '1', viewValue: '10'},
    {value: '2', viewValue: '20'},
    {value: '3', viewValue: '30'}
  ];

  Editor = ClassicEditor;
  template = {
    editorData: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

  selectShipment = (id) => {
    this.selectedShipment = id;
  }

  selectReceiver = (id) => {
    this.selectedReceiver = id;
  }

  create = () => {
  }

}
