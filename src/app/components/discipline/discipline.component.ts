import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { DisciplineService } from '../../services/discipline.service';
import { Discipline } from '../../models/discipline';

@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.scss']
})
export class DisciplineComponent implements OnInit {

  mobile: boolean;
  discipline: Discipline = {} as Discipline;

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.mobile = window.innerWidth < 980;
  }

  constructor(private route: ActivatedRoute,
              private disciplineService: DisciplineService) {
    this.mobile = window.innerWidth < 980;
  }

  ngOnInit(): void {
    this.discipline.name = this.route.snapshot.paramMap.get('name');
    this.disciplineService.getDisciplineByName(this.discipline.name).subscribe(discipline => this.discipline = discipline);
  }
}
