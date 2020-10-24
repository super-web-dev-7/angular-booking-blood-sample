import {Component, HostListener, Input, OnInit} from '@angular/core';
import {SharedService} from '../../../../../service/shared/shared.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {HttpService} from '../../../../../service/http/http.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {URL_JSON} from '../../../../../utils/url_json';

@Component({
  selector: 'app-left-message-popup',
  templateUrl: './left-message-popup.component.html',
  styleUrls: ['./left-message-popup.component.scss']
})
export class LeftMessagePopupComponent implements OnInit {
  @Input() callbackInfo;
  @Input() isMobile;
  @Input() isTablet;
  content = null;
  Editor = ClassicEditor;
  messageForm: FormGroup;
  constructor(
    public breakpointObserver: BreakpointObserver,
    public sharedService: SharedService,
    public httpService: HttpService,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      message: [null, Validators.required],
    });
  }

  get f(): any {
    return this.messageForm.controls;
  }

  close = () => {
    this.sharedService.closeHistory.emit('t-history');
  }

  sendMessage = () => {
    if (this.messageForm.invalid) {
      return;
    }
    const data = {
      callbackId: this.callbackInfo.callbackId,
      answer: this.f.message.value,
    };
    if (data) {
      this.httpService.post(URL_JSON.DOCTOR + '/sendMessageToPatientAboutCallback', data).subscribe((res: any) => {
        if (res) {
          this.sharedService.sentMessage.emit(true);
          this.close();
        }
      });
    }
  }

}
