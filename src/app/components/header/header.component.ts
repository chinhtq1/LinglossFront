import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../../services/local-storage.service';
import {User} from '../../models/user';
import {faTelegramPlane} from '@fortawesome/free-brands-svg-icons';
import {faInfo, faGlobeAmericas, faBook} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
  faTelegram = faTelegramPlane;
  faGlobe = faGlobeAmericas;
  faInfo = faInfo;
  faUser = faUser;
  faBook = faBook;

  isModalVisible = false;
export class HeaderComponent implements OnInit {
  user: User = null;

  constructor(private lss: LocalStorageService) {
  }

  ngOnInit(): void {
    this.user = this.lss.getUser();
  }

  logout(): void {
    this.lss.clearUser();
    window.location.reload();
    this.ngOnInit();
  }

  openModal(): void {
    this.isModalVisible = true;
  }
}
