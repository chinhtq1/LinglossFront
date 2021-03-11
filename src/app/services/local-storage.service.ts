import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly CURRENT_USER: string = 'user';
  private currentUser: User;

  public getUser(): User {
    if (this.currentUser == null || this.currentUser.role == null) {
      this.currentUser = JSON.parse(localStorage.getItem(this.CURRENT_USER));
    }
    return this.currentUser;
  }

  public setUser(currentUser: User): void {
    this.currentUser = currentUser;
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(currentUser));
  }


  public clearUser(): void {
    this.currentUser = null;
    localStorage.setItem(this.CURRENT_USER, null);
  }
}
