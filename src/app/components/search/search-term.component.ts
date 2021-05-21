import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {Discipline} from '../../models/discipline';
import {Term} from '../../models/term';
import {TermService} from '../../services/term.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-term',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchTermComponent {
  @Input()
  discipline: Discipline;

  @Output() termEventEmitter = new EventEmitter<Term>();

  selectedValue: Term = null;
  listOfOption: Term[] = [];
  mobile: boolean;
  notFound = 'Term not found';
  placeHolder = 'Input the term';

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.mobile = window.innerWidth < 980;
  }

  constructor(private termService: TermService,
              private router: Router) {
    this.mobile = window.innerWidth < 980;
  }

  search(value: string): void {
    this.termService.searchTerms(value)
      .subscribe(data => {
        this.listOfOption = [];
        data.forEach(term => {
          this.listOfOption.push(term);
        });
      }, () => {
      });
  }

  clear(): void {
    this.selectedValue = null;
  }

  explore(): void {
    this.router.navigate(['disciplines/' + this.selectedValue.discipline + '/' + this.selectedValue.name]);
  }

  detectLabel(option: Term): string {
    return option.name + ' in ' + option.discipline;
  }
}
