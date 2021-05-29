import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../../services/local-storage.service';
import {User} from '../../models/user';
import {ApplicationForDisciplineService} from '../../services/application-for-discipline.service';
import {DisciplineService} from '../../services/discipline.service';
import {UserService} from '../../services/user.service';
import {ApplicationForDiscipline} from "../../models/applicationForDiscipline";

@Component({
  selector: 'app-my-discipline-applications',
  templateUrl: './my-discipline-applications.component.html',
  styleUrls: ['./my-discipline-applications.component.scss']
})
export class MyDisciplineApplicationsComponent implements OnInit {

  user: User = {} as User;
  applications: ApplicationForDiscipline[] = [];
  dataSet: DataInterface[] = [];

  constructor(private lss: LocalStorageService,
              private applicationForDisciplineService: ApplicationForDisciplineService,
              private disciplineService: DisciplineService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.lss.getUser() ? this.lss.getUser() : this.user;
    if (this.user.disciplines) {
      this.user.disciplines.forEach(discipline => {
        this.applicationForDisciplineService.getApplicationsByDiscipline(discipline).subscribe(applications => {
          applications.forEach(a => {
            this.applications.push(a);
            const data = {} as DataInterface;
            this.disciplineService.getDiscipline(a.discipline).subscribe(d => {
              data.disciplineName = d.name;
              data.disciplineId = d.id;
              this.userService.getUser(a.student).subscribe(u => {
                data.studentId = u.id;
                data.studentName = u.name + ' ' + u.surname;
                this.dataSet.push(data);
              });
            });
          });
        });
      });
    }
  }

  submitApplication(data: DataInterface): void {
    this.userService.getUser(data.studentId).subscribe(student => {
      student.disciplines.push(data.disciplineId);
      this.userService.updateUser(student).subscribe(() => {
        this.cancelApplication(data);
      });
    });
  }

  cancelApplication(data: DataInterface): void {
    const application = this.applications.filter(a => a.discipline === data.disciplineId && a.student === data.studentId)[0];
    this.applicationForDisciplineService.removeApplication(application).subscribe(() => {
      window.location.reload();
    });
  }
}

export class DataInterface {
  disciplineId: string;
  disciplineName: string;
  studentId: string;
  studentName: string;
}
