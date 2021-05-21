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
    this.descriptionStart = 'Линглосс - это веб-сервис для изучения терминов.';
    this.descriptionEnd = 'Данный сервис может быть использован как:';
    this.descriptionPoints = ['учебный помощник для студентов, ',
      'тренажер для переводчиков, ', 'справочник для всех, кто интересуется данной темой,',
      'и другое. '];
  }

}
