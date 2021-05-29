import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../../services/local-storage.service';
import {User} from '../../models/user';
import {faTelegramPlane} from '@fortawesome/free-brands-svg-icons';
import {faInfo, faGlobeAmericas, faBook, faPlusSquare, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  user: User = null;
  faBook = faBook;
  faTelegram = faTelegramPlane;
  faGlobe = faGlobeAmericas;
  faInfo = faInfo;
  faUser = faUser;
  faPlus = faPlusSquare;
  faSignOut = faSignOutAlt;

  isModalVisible = false;

  language = 'RU';

  linglossText = '';
  mainText = '';
  changeLanguageText = '';
  aboutText = '';
  logoutText = '';

  constructor(private lss: LocalStorageService) {
  }

  ngOnInit(): void {
    this.user = this.lss.getUser();
    this.language = this.lss.getLanguage() ? this.lss.getLanguage() : this.language;
    this.lss.setLanguage(this.language);
    if (this.language === 'RU') {
      this.linglossText = 'Линглосс';
      this.mainText = 'Основное';
      this.changeLanguageText = 'Сменить язык';
      this.aboutText = 'О сервисе';
      this.logoutText = 'Выйти';
    } else if (this.language === 'BE') {
      this.linglossText = 'Лінглос';
      this.mainText = 'Асноўнае';
      this.changeLanguageText = 'Змяніць мову';
      this.aboutText = 'Пра сэрвіс';
      this.logoutText = 'Выйсці';
    } else if (this.language === 'EN') {
      this.linglossText = 'Lingloss';
      this.mainText = 'Main';
      this.changeLanguageText = 'Set language';
      this.aboutText = 'About';
      this.logoutText = 'Logout';
    }
  }

  logout(): void {
    this.lss.clearUser();
    window.location.reload();
    this.ngOnInit();
  }

  openModal(): void {
    this.isModalVisible = true;
  }

  setLanguage(language: string): void {
    this.lss.setLanguage(language);
    window.location.reload();
  }
}
