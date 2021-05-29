import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {Discipline} from '../../models/discipline';
import {Term} from '../../models/term';
import {TermService} from '../../services/term.service';
import {Router} from '@angular/router';
import {LocalStorageService} from "../../services/local-storage.service";

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
  notFound = 'Термин не найден';
  placeHolder = 'Введите термин';

  language = 'RU';

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.mobile = window.innerWidth < 980;
  }

  constructor(private termService: TermService,
              private router: Router,
              private lss: LocalStorageService) {
    this.mobile = window.innerWidth < 980;
    this.language = this.lss.getLanguage() ? this.lss.getLanguage() : this.language;
    if (this.language === 'RU') {
      this.placeHolder = 'Введите термин';
    } else if (this.language === 'BE') {
      this.placeHolder = 'Увядзіце тэрмін';
    } else if (this.language === 'EN') {
      this.placeHolder = 'Input the term';
    }
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
    return option.name + ' в ' + option.discipline;
  }
}
