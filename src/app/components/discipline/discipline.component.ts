import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { DisciplineService } from '../../services/discipline.service';
import { Discipline } from '../../models/discipline';

@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.scss']
})
export class DisciplineComponent implements OnInit {

  discipline: Discipline = {} as Discipline;

  constructor(private route: ActivatedRoute,
              private disciplineService: DisciplineService) {
  }

  ngOnInit(): void {
    this.discipline.name = this.route.snapshot.paramMap.get('name');
    this.disciplineService.getDisciplineByName(this.discipline.name).subscribe(discipline => this.discipline = discipline);
  }
}
