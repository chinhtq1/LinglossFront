import {Component, HostListener, OnInit} from '@angular/core';
import {Term} from '../../models/term';
import {TermService} from '../../services/term.service';
import {PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree} from '@angular/router';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.scss']
})
export class TermComponent {

  term: Term = {attributes: []} as Term;
  mobile: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.mobile = window.innerWidth < 600;
  }

  constructor(private termService: TermService,
              private router: Router) {
    this.mobile = window.innerWidth < 600;

    const tree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    const discipline = s[1].path;
    const name = s[2].path;

    this.term.name = name;

    this.termService.getTermByNameAndDiscipline(name, discipline).subscribe(term => {
        this.term.id = term.id;
        this.term.name = term.name;
        this.term.discipline = term.discipline;
        this.term.definition = term.definition;
        if (term.attributes) {
          term.attributes.forEach(a => {
            this.term.attributes.push(Object.entries(a)); // TODO refactor
          });
        }
      }
    );
  }
}
