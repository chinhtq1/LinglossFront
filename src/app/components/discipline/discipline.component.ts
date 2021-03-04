import { Component, OnInit } from '@angular/core';
import { PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';
import { DisciplineService } from '../../services/discipline.service';
import { Discipline } from '../../models/discipline';

@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.scss']
})
export class DisciplineComponent implements OnInit {

  discipline: Discipline = {} as Discipline;

  constructor(private router: Router,
              private disciplineService: DisciplineService) {
  }

  ngOnInit(): void {
    const tree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    this.discipline.name = s[1].path;
    this.disciplineService.getDisciplineByName(this.discipline.name).subscribe(discipline => this.discipline = discipline);
  }
}
