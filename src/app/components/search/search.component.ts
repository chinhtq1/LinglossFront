import { Component, Input } from '@angular/core';
import { Discipline } from '../../models/discipline';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input()
  discipline: Discipline;
}
