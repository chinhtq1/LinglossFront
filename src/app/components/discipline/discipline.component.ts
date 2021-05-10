import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { DisciplineService } from '../../services/discipline.service';
import { Discipline } from '../../models/discipline';
import {ApplicationForDiscipline} from '../../models/applicationForDiscipline';
import {NzMessageService} from 'ng-zorro-antd/message';
import {LocalStorageService} from '../../services/local-storage.service';
import {User} from '../../models/user';
import {ApplicationForDisciplineService} from '../../services/application-for-discipline.service';

@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.scss']
})
export class DisciplineComponent implements OnInit {

  mobile: boolean;
  discipline: Discipline = {} as Discipline;
  user: User = {} as User;
  isMyDiscipline: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.mobile = window.innerWidth < 600;
  }

  constructor(private route: ActivatedRoute,
              private disciplineService: DisciplineService,
              public msg: NzMessageService,
              private lss: LocalStorageService,
              private applicationForDisciplineService: ApplicationForDisciplineService) {
    this.mobile = window.innerWidth < 600;
  }

  ngOnInit(): void {
    this.user = this.lss.getUser();
    this.discipline.name = this.route.snapshot.paramMap.get('name');
    this.disciplineService.getDisciplineByName(this.discipline.name).subscribe(discipline => {
      this.discipline = discipline;
      if (this.user.disciplines.length) {
        this.isMyDiscipline = !!this.user.disciplines.filter(d => d === this.discipline.id).length;
      }
    });
  }

  sendApplicationForTheDiscipline(discipline: Discipline): void {
    if (this.user && this.user.disciplines.length) {
      const application = {
        student: this.user.id,
        discipline: discipline.id
      } as ApplicationForDiscipline;
      this.applicationForDisciplineService.apply(application).subscribe(() => {
        this.msg.success('Your application for ' + discipline.name + ' has been sent.');
      }, () => {
        this.msg.error('Error!');
      });
    } else {
      this.msg.error('You need to authorize');
    }
  }
}
