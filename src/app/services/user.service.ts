import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({providedIn: 'root'})
export class UserService {

  private usersUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.usersUrl + '/' + id);
  }

  sendUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl + '/register', user);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.get<User>(this.usersUrl + '/' + email + '/' + password);
  }
}
