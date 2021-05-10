import { Component, OnInit } from '@angular/core';
import { Discipline } from '../../models/discipline';
import { DisciplineService } from '../../services/discipline.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html'
})
export class DisciplinesComponent implements OnInit {
  loading = false;
  disciplines: Discipline[] = [];
  user: User = {} as User;

  constructor(private disciplineService: DisciplineService,
              private lss: LocalStorageService) {
  }

  ngOnInit(): void {
    this.user = this.lss.getUser();
    this.disciplineService.getDisciplines().subscribe(data => {
      this.disciplines = data;
    });
  }
}
