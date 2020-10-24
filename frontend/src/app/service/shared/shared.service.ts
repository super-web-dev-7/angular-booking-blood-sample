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
  public patientLeft: EventEmitter<any>;
  public patientPopup: EventEmitter<any>;
  public patientMobile: EventEmitter<any>;
  public sentMessage: EventEmitter<any>;

  constructor() {
    this.test = new EventEmitter<any>();
    this.answer = new EventEmitter<any>();
    this.closeHistory = new EventEmitter<any>();
    this.check = new EventEmitter<any>();
    this.tabletSide = new EventEmitter<any>();
    this.tabletLeftSide = new EventEmitter<any>();
    this.patientLeft = new EventEmitter<any>();
    this.patientPopup = new EventEmitter<any>();
    this.patientMobile = new EventEmitter<any>();
    this.sentMessage = new EventEmitter<any>();
  }
}
