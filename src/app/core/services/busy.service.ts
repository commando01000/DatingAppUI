import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  constructor(private spinner: NgxSpinnerService) { }
  busyRequestsCount = 0;

  busy() {
    this.busyRequestsCount++;
    this.spinner.show(undefined, {
      type: 'ball-pulse-sync',
      bdColor: 'rgba(255,255,255,0)',
      color: '#333333'
    });
  }

  idle() {
    this.busyRequestsCount--;
    if (this.busyRequestsCount <= 0) {
      this.busyRequestsCount = 0;
      this.spinner.hide();
    }
  }
}
