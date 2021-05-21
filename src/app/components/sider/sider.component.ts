import {Component, Output, EventEmitter} from '@angular/core';
import {Discipline} from '../../models/discipline';
import {Router} from '@angular/router';
import { User } from '../../models/user';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.scss']
})
export class SiderComponent {

  @Output()
  closeSider = new EventEmitter<boolean>();

  user: User = {} as User;

  constructor(public router: Router,
              private lss: LocalStorageService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.user = this.lss.getUser();
  }

  navigateToAllDisciplines(): void {
    this.closeSider.emit(true);
    this.router.navigate(['disciplines/']);
  }

  navigateToDiscipline(discipline: string): void {
    this.router.navigate(['disciplines/' + discipline]).then();
  }
}
