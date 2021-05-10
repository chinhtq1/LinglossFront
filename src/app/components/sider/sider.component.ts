import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Discipline } from '../../models/discipline';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { DisciplineService } from '../../services/discipline.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.scss']
})
export class SiderComponent implements OnInit {
  disciplines: Discipline[] = [];
  user: User = {} as User;

  @Output()
  closeSider = new EventEmitter<boolean>();

  constructor(public router: Router,
              private userService: UserService,
              private disciplineService: DisciplineService,
              private lss: LocalStorageService) {
    this.router.routeReuseStrategy.shouldReuseRoute = (): boolean => false;
  }

  ngOnInit(): void {
    this.user = this.lss.getUser();
    if (this.user && this.user.disciplines) {
      this.user.disciplines.forEach(disciplineId => {
        this.disciplineService.getDiscipline(disciplineId).subscribe(discipline => {
            this.disciplines.push(discipline);
          }
        );
      });
    }
  }

  navigateToAllDisciplines(): void {
    this.closeSider.emit(true);
    this.router.navigate(['disciplines/']);
  }

  navigateToDiscipline(discipline: Discipline): void {
    this.router.navigate(['disciplines/' + discipline.name]);
  }
}
