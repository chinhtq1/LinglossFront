import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Lingloss';
  collapsed = true;
  mobile: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.mobile = window.innerWidth < 600;
  }

  closeSider(event): void {
    this.collapsed = event;
  }

  constructor() {
    this.mobile = window.innerWidth < 600;
  }
}
