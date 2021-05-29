import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ApplicationForDiscipline} from '../models/applicationForDiscipline';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ApplicationForDisciplineService {
  private applicationForDisciplinesUrl = environment.applicationForDisciplinesUrl;

  constructor(private http: HttpClient) {
  }

  apply(applicationForTheDiscipline: ApplicationForDiscipline): Observable<ApplicationForDiscipline> {
    return this.http.post<ApplicationForDiscipline>(this.applicationForDisciplinesUrl + '/apply', applicationForTheDiscipline);
  }

  getApplicationsByDiscipline(disciplineId: string): Observable<ApplicationForDiscipline[]> {
    return this.http.get<ApplicationForDiscipline[]>(this.applicationForDisciplinesUrl + '/' + disciplineId);
  }

  removeApplication(application: ApplicationForDiscipline): Observable<ApplicationForDiscipline> {
    return this.http.post<ApplicationForDiscipline>(this.applicationForDisciplinesUrl + '/remove', application);
  }
}
