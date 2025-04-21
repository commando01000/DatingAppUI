import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { IUser } from '../../interfaces/IUser';
import { filter, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _httpClient: HttpClient) {}

  currentUser = signal<IUser | null>(null);

  baseUrl: string = 'https://localhost:7120/api';
  login(model: any): Observable<any> {
    return this._httpClient.post(this.baseUrl + '/Account/login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          this.currentUser.set(user);
          localStorage.setItem('token', user.token);
        }
        return user;
      })
    );
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('token');
  }
}
