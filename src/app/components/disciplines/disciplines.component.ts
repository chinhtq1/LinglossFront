import { Component, OnInit } from '@angular/core';
import { Discipline } from '../../models/discipline';
import { DisciplineService } from '../../services/discipline.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrls: ['./disciplines.component.scss']
})
export class DisciplinesComponent implements OnInit {
  loading = false;
  disciplines: Discipline[] = [];

  constructor(private disciplineService: DisciplineService,
              public msg: NzMessageService) {
  }

  ngOnInit(): void {
    this.disciplineService.getDisciplines().subscribe(data => this.disciplines = data);
  }
}
