import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../../services/local-storage.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
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
}
