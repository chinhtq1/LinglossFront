import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  descriptionStart: string;
  descriptionEnd: string;
  descriptionPoints: string[];

  ngOnInit(): void {
    this.descriptionStart = 'Lingloss is a web service for exploration of linguistic terminology.';
    this.descriptionEnd = 'This service can be used as:';
    this.descriptionPoints = ['an educational assistant for students, ',
      'a trainer for translators, ', 'a reference book for anyone interested in linguistic terminology,',
      'and other. '];
  }

}
