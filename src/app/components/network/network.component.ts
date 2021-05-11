import { Component, Input, OnInit } from '@angular/core';
import {TermService} from '../../services/term.service';
import {NetworkNode} from '../../models/networkNode';
import {Term} from '../../models/term';
import {NetworkLink} from '../../models/networkLink';
import {Router} from '@angular/router';

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

  ngOnInit(): void {
    this.nodes.push({id: 'TERM', label: this.term.name});
    if (this.term.subjectArea && this.term.subjectArea.length > 0) {
      this.term.subjectArea.forEach((area, index) => {
        this.nodes.push({id: index.toString(), label: area.area});
        this.links.push({id: index.toString() + 'LINK', source: 'TERM', target: index.toString()});
      });
    }
  }
}
