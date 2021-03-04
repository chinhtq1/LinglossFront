import { Component, Input, OnInit } from '@angular/core';
import { Discipline } from '../../models/discipline';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {

  @Input()
  discipline: Discipline;

  ngOnInit(): void {
  }

}
