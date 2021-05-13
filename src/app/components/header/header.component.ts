import {Component} from '@angular/core';
import {faTelegramPlane} from '@fortawesome/free-brands-svg-icons';
import {faInfo, faGlobeAmericas, faBook} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  faTelegram = faTelegramPlane;
  faGlobe = faGlobeAmericas;
  faInfo = faInfo;
  faUser = faUser;
  faBook = faBook;

  isModalVisible = false;

  openModal(): void {
    this.isModalVisible = true;
  }
}
