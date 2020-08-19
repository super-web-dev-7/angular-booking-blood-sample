import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.scss']
})
export class InterfaceComponent implements OnInit {

  selectedDeleteItem: number = null;
  elements = [
    {
      id: 1,
      name: 'SMS'
    },
    {
      id: 2,
      name: 'PayPal'
    },
    {
      id: 3,
      name: 'Labor'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

  delete = (id) => {
    this.selectedDeleteItem = id;
  }

  deleteItem = () => {
    this.selectedDeleteItem = null;
  }

}
