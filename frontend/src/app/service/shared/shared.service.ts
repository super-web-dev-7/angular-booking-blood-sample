import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public test: EventEmitter<any>;
  public answer: EventEmitter<any>;
  public closeHistory: EventEmitter<any>;
  public check: EventEmitter<any>;
  public tabletSide: EventEmitter<any>;
  public tabletLeftSide: EventEmitter<any>;

  constructor() {
    this.test = new EventEmitter<any>();
    this.answer = new EventEmitter<any>();
    this.closeHistory = new EventEmitter<any>();
    this.check = new EventEmitter<any>();
    this.tabletSide = new EventEmitter<any>();
    this.tabletLeftSide = new EventEmitter<any>();
  }
}
