import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Term } from '../models/term';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class TermService {

  private termsUrl = environment.termsUrl;

  constructor(private http: HttpClient) {
  }

  getTerms(): Observable<Term[]> {
    return this.http.get<Term[]>(this.termsUrl + '/find-all-terms');
  }

  getTerm(id: string): Observable<Term> {
    return this.http.get<Term>(this.termsUrl + '/find-all-terms/' + id);
  }

  getTermByNameAndDiscipline(name: string, discipline: string): Observable<Term> {
    return this.http.get<Term>(this.termsUrl + '/find-by-name-and-discipline/' + name + '/' + discipline);
  }

  sendTerm(term: Term): Observable<Term> {
    if (!term.applicationMode) {
      term.applicationMode = false;
    }
    return this.http.post<Term>(this.termsUrl + '/add-term', term);
  }

  getTermsByDiscipline(name: string): Observable<Term[]> {
    return this.http.get<Term[]>(this.termsUrl + '/discipline/' + name);
  }

  searchTerms(value: string): Observable<Term[]> {
    return this.http.get<Term[]>(this.termsUrl + '/search-' + value);
  }

  getNetwork(termName: string): Observable<Term[]> {
    return this.http.get<Term[]>(this.termsUrl + '/network-for-' + termName);
  }

  getApplicationsByDiscipline(disciplineId: string): Observable<Term[]> {
    return this.http.get<Term[]>(this.termsUrl + '/applications/' + disciplineId);
  }

  deleteTerm(term: Term): Observable<any> {
    return this.http.delete(this.termsUrl + '/delete/' + term.id);
  }
}
