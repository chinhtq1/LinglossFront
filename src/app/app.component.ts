import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Lingloss';
  collapsed = false;
  mobile = false;

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.mobile = this.collapsed = window.innerWidth < 600;
    this.collapsed = !this.mobile;
  }

  changeSiderStatus(event): void {
    this.collapsed = event;
  }

  ngOnInit(): void {
    this.mobile = window.innerWidth < 600;
  }

  constructor() {
  }
}
