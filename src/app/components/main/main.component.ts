import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  descriptionStart: string;
  descriptionEnd: string;
  descriptionPoints: string[];

  language = 'RU';
  linglossText = '';

  constructor(private lss: LocalStorageService) {
    this.language = this.lss.getLanguage() ? this.lss.getLanguage() : this.language;
    if (this.language === 'RU') {
      this.linglossText = 'Линглосс';
      this.descriptionStart = 'Линглосс - это веб-сервис для изучения терминов.';
    } else if (this.language === 'BE') {
      this.linglossText = 'Лінглос';
      this.descriptionStart = 'Лінглос - гэта сэрвіс для вывучэння тэрмінаў.';
    } else if (this.language === 'EN') {
      this.linglossText = 'Lingloss';
      this.descriptionStart = 'Lingloss is a service for exploration of terminology.';
    }
  }

  ngOnInit(): void {
    this.descriptionEnd = 'Данный сервис может быть использован как:';
    this.descriptionPoints = ['учебный помощник для студентов, ',
      'тренажер для переводчиков, ', 'справочник для всех, кто интересуется данной темой,',
      'и другое. '];
  }

}
