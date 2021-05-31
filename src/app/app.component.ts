import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Lingloss';
  collapsed = true;
  mobile = false;
  showVideo = true;

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.mobile = this.collapsed = window.innerWidth < 980;
    this.collapsed = !this.mobile;
  }

  constructor(private router: Router) {
    router.events.subscribe((value) => {
      this.showVideo = window.location.pathname === '/start';
    });
  }

  ngOnInit(): void {
    this.mobile = window.innerWidth < 980;
  }

  abortStop(e): void{
    e.preventDefault();
  }
}
