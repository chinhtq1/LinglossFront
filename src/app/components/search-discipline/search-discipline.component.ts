import {Component, HostListener} from '@angular/core';
import {Discipline} from '../../models/discipline';
import {Router} from '@angular/router';
import {DisciplineService} from '../../services/discipline.service';

@Component({
  selector: 'app-search-discipline',
  templateUrl: './search-discipline.component.html',
  styleUrls: ['./search-discipline.component.scss']
})
export class SearchDisciplineComponent {

  selectedValue: Discipline = null;
  listOfOption: Discipline[] = [];
  mobile: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.mobile = window.innerWidth < 980;
  }

  constructor(private disciplineService: DisciplineService,
              private router: Router) {
    this.mobile = window.innerWidth < 980;
  }

  search(value: string): void {
    this.disciplineService.searchDisciplines(value)
      .subscribe(data => {
        this.listOfOption = [];
        data.forEach(discipline => {
          this.listOfOption.push(discipline);
        });
      }, () => {
      });
  }

  clear(): void {
    this.selectedValue = null;
  }

  explore(): void {
    this.router.navigate(['disciplines/' + this.selectedValue.name]);
  }
}
