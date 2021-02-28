import { Component } from '@angular/core';
import { Discipline } from '../../models/discipline';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.scss']
})
export class SiderComponent {
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
