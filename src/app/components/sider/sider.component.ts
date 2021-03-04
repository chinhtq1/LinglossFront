import { Component, OnInit } from '@angular/core';
import { Discipline } from '../../models/discipline';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { DisciplineService } from '../../services/discipline.service';

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.scss']
})
export class SiderComponent implements OnInit {
  disciplines: Discipline[] = [];

  constructor(public router: Router,
              private userService: UserService,
              private disciplineService: DisciplineService) {
    // tslint:disable-next-line:only-arrow-functions
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  ngOnInit(): void {
    this.userService.getUser('1').subscribe(data => {
      data.disciplines.forEach(id => this.disciplineService.getDiscipline(id).subscribe(discipline => {
        this.disciplines.push(discipline);
      }));
    }); // TODO get user id from localstorage
  }

  navigateToDiscipline(discipline: Discipline): void {
    this.router.navigate(['disciplines/' + discipline.name]);
  }
}
