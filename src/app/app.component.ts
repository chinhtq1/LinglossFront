import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Lingloss';
  collapsed = true;
  mobile = false;

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.mobile = this.collapsed = window.innerWidth < 980;
    this.collapsed = !this.mobile;
  }

  changeSiderStatus(event): void {
    this.collapsed = event;
  }

  ngOnInit(): void {
    this.mobile = window.innerWidth < 980;
    // setInterval(() => {
    //   const currentHours = new Date().getHours();
    //   if (currentHours === 0 || currentHours > 7) {
    //     termService.getTerms().subscribe();
    //   }
    // }, 1620000);
  }

  constructor() {
  }
}
