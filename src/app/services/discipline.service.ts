import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Discipline } from '../models/discipline';

@Injectable({providedIn: 'root'})
export class DisciplineService {

  private disciplinesUrl = 'http://localhost:8080/api/disciplines';

  constructor(private http: HttpClient) {
  }

  getDisciplines(): Observable<Discipline[]> {
    return this.http.get<Discipline[]>(this.disciplinesUrl + '/find-all');
  }

  getDiscipline(id: string): Observable<Discipline> {
    return this.http.get<Discipline>(this.disciplinesUrl + '/find-all/' + id);
  }

  sendDiscipline(discipline): Observable<Discipline> {
    return this.http.post<Discipline>(this.disciplinesUrl + '/add-discipline', discipline);
  }

  getDisciplineByName(name): Observable<Discipline> {
    return this.http.get<Discipline>(this.disciplinesUrl + '/' + name);
  }

  searchDisciplines(value: string): Observable<Discipline[]> {
    return this.http.get<Discipline[]>(this.disciplinesUrl + '/search-discipline-' + value);
  }
}
