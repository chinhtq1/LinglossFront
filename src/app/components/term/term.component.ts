import {Component, OnInit} from '@angular/core';
import {Term} from '../../models/term';
import {TermService} from '../../services/term.service';
import {PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree} from '@angular/router';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.scss']
})
export class TermComponent implements OnInit {

  term: Term = {attributes: []} as Term;

  header = '';

  constructor(private termService: TermService,
              private router: Router) {
  }

  ngOnInit(): void {
    const tree: UrlTree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;
    const discipline = s[1].path;
    const name = s[2].path;

    this.header = name;

    this.term.definition = '';
    this.term.attributes.push([['Definition'], [this.term.definition]]);

    this.termService.getTermByNameAndDiscipline(name, discipline).subscribe(term => {
      if (term.attributes) {
          term.attributes.forEach(a => {
            this.term.attributes.push(Object.entries(a));
            console.log(Object.entries(a)); // TODO refactor
          });
        }
      }
    );
  }
}
