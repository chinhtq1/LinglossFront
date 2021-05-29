import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {LocalStorageService} from '../../services/local-storage.service';
import {TermService} from '../../services/term.service';
import {Term} from '../../models/term';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-term-applications',
  templateUrl: './my-term-applications.component.html',
  styleUrls: ['./my-term-applications.component.scss']
})
export class MyTermApplicationsComponent implements OnInit {

  user: User = {} as User;
  applications: Term[] = [];
  dataSet: DataTermInterface[] = [];

  constructor(private lss: LocalStorageService,
              private termService: TermService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.user = this.lss.getUser() ? this.lss.getUser() : this.user;
    this.user.disciplines.forEach(discipline => {
      this.termService.getApplicationsByDiscipline(discipline).subscribe(applications => {
        applications.forEach(a => {
          this.applications.push(a);
          this.userService.getUser(a.userId).subscribe(user => {
            const data = {
              termName: a.name,
              termId: a.id,
              disciplineName: a.discipline,
              disciplineId: discipline,
              studentId: a.userId,
              studentName: ''
            } as DataTermInterface;
            data.studentName = user.name + ' ' + user.surname;
            this.dataSet.push(data);
          });
        });
      });
    });
  }

  openApplication(data: DataTermInterface): void {
    this.router.navigate(['term-application/' + data.termId]);
  }

  submitApplication(data: DataTermInterface): void {
    const application = this.applications.filter(a => a.id === data.termId)[0];
    application.applicationMode = false;
    this.termService.sendTerm(application).subscribe(() => {
      window.location.reload();
    });
  }

  cancelApplication(data: DataTermInterface): void {
    const application = this.applications.filter(a => a.id === data.termId)[0];
    this.termService.deleteTerm(application).subscribe(() => {
      window.location.reload();
    });
  }
}

export class DataTermInterface {
  termName: string;
  termId: string;
  studentName: string;
  studentId: string;
  disciplineName: string;
  disciplineId: string;
}
