import { Component, OnInit } from '@angular/core';
import { Discipline } from '../../models/discipline';
import { DisciplineService } from '../../services/discipline.service';

@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html'
})
export class DisciplinesComponent implements OnInit {
  loading = false;
  disciplines: Discipline[] = [];

  constructor(private disciplineService: DisciplineService) {
  }

  ngOnInit(): void {
    this.disciplineService.getDisciplines().subscribe(data => this.disciplines = data);
  }
}
