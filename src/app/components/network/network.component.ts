import { Component, Input, OnInit } from '@angular/core';
import {TermService} from '../../services/term.service';
import {NetworkNode} from '../../models/networkNode';
import {Term} from '../../models/term';
import {NetworkLink} from '../../models/networkLink';

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

  constructor(private termService: TermService) {
  }

  ngOnInit(): void {
    this.termService.getNetwork(this.term.name).subscribe(terms => {
      terms.forEach((term, index) => {
        this.nodes.push({id: term.id, label: term.discipline});
        if (this.term.id !== term.id) {
          this.links.push({id: index.toString(), source: this.term.id, target: term.id});
        }
      });
    });
  }

}
