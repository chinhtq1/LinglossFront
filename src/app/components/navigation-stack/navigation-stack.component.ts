import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-stack',
  templateUrl: './navigation-stack.component.html',
  styleUrls: ['./navigation-stack.component.scss']
})
export class NavigationStackComponent implements OnInit {

  route: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.route = this.router.url;
  }

}
