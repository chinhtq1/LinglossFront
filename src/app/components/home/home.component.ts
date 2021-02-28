import { Component } from '@angular/core';
import { Discipline } from '../../models/discipline';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  disciplines: Discipline[] = [
    {id: 1, name: 'Discipline1'},
    {id: 2, name: 'Discipline2'}
  ];

  constructor(public router: Router) {
  }

  navigateToDiscipline(discipline: Discipline): void {
    this.router.navigate(['discipline/' + discipline.name]);
  }
}
