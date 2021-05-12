import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class UserService {

  private usersUrl = environment.usersUrl;

  constructor(private http: HttpClient) {
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.usersUrl + '/' + id);
  }

  updateUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl + '/update/', user);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.get<User>(this.usersUrl + '/' + email + '/' + password);
  }

  registerUser(user): Observable<User> {
    return this.http.post<User>(this.usersUrl + '/register', user);
  }
}
