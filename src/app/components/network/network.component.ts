import { Component, Input, OnInit } from '@angular/core';
import {NetworkNode} from '../../models/networkNode';
import {Term} from '../../models/term';
import {NetworkLink} from '../../models/networkLink';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {

  @Input()
  term: Term;

  links: NetworkLink[] = [];
  nodes: NetworkNode[] = [];

  tooltip = '';

  zoomToFit$: Subject<boolean> = new Subject();
  center$: Subject<boolean> = new Subject();

  ngOnInit(): void {
    this.nodes.push({id: 'TERM', label: this.term.name});
    if (this.term.subjectArea && this.term.subjectArea.length > 0) {
      this.term.subjectArea.forEach((area, index) => {
        this.nodes.push({id: index.toString(), label: area.area});
        this.links.push({id: index + 9876, source: 'TERM', target: index.toString()});
      });
    }
    this.zoomToFit$.next(true);
    this.center$.next(true);
  }

  showDefinition(node: any): void {
    if (node.label !== this.term.name) {
      this.tooltip = this.term.subjectArea.filter(area => area.area === node.label)[0].termDefinition;
    } else {
      this.tooltip = 'Initial term';
    }
  }
}
