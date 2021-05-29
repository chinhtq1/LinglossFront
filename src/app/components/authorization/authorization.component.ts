import {Component, Input} from '@angular/core';
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent {
  @Input()
  isVisible = false;

  isOkLoading = false;

  language = 'RU';
  authorizationText = '';

  constructor(private lss: LocalStorageService) {
    this.language = this.lss.getLanguage() ? this.lss.getLanguage() : this.language;
    if (this.language === 'RU') {
      this.authorizationText = 'Авторизация';
    } else if (this.language === 'BE') {
      this.authorizationText = 'Аўтарызацыя';
    } else if (this.language === 'EN') {
      this.authorizationText = 'Login';
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  login(): void {
    this.handleCancel();
    window.location.reload();
  }
}
