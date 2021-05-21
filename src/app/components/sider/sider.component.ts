import {Component, Output, EventEmitter} from '@angular/core';
import { Discipline } from '../../models/discipline';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.scss']
})
export class SiderComponent {

  @Output()
  closeSider = new EventEmitter<boolean>();

  constructor(public router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  navigateToAllDisciplines(): void {
    this.closeSider.emit(true);
    this.router.navigate(['disciplines/']);
  }

  navigateToDiscipline(discipline: Discipline): void {
    this.router.navigate(['disciplines/' + discipline.name]);
  }
}
