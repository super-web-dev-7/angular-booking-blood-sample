import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../service/auth/auth.service';
import {Router} from '@angular/router';
import {SharedService} from '../../../service/shared/shared.service';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {

  @Output() closeSide = new EventEmitter();

  constructor(
    public authService: AuthService,
    public router: Router,
    private sharedService: SharedService
  ) { }
  ngOnInit(): void {
  }

  close = () => {
    this.closeSide.emit(false);
  }

  dashboard = () => {
    this.router.navigateByUrl('/doctor').then(r => {
      this.sharedService.test.emit();
      this.close();
    });
  }

  laboratory = () => {
    this.router.navigateByUrl('/doctor/laboratory-report').then(r => {
      this.sharedService.test.emit();
      this.close();
    });
  }

  archive = () => {
    this.router.navigateByUrl('/doctor/archive').then(r => {
      this.sharedService.test.emit();
      this.close();
    });
  }
}
