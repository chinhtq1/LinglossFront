import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Term } from '../models/term';

@Injectable({providedIn: 'root'})
export class TermsService {

  private termsUrl = 'http://localhost:8080/api/terms';

  constructor(private http: HttpClient) {
  }

  getTerms(): Observable<Term[]> {
    return this.http.get<Term[]>(this.termsUrl + '/find-all-terms');
  }

  getTerm(id: number): Observable<Term> {
    return this.http.get<Term>(this.termsUrl + '/find-all-terms/' + id);
  }

  sendTerm(term): Observable<Term> {
    console.log('send', term);
    return this.http.post<Term>(this.termsUrl + '/add-term', term);
  }
}
