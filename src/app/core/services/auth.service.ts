import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { User } from '../../interfaces/user';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _httpClient: HttpClient) {}

  currentUser = signal<User | null>(null);

  baseUrl = environment.baseUrl;
  login(model: FormGroup): Observable<any> {
    return this._httpClient.post(this.baseUrl + '/Account/login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          var decodedUser = jwtDecode(user.token) as User;
          this.currentUser.set(decodedUser);
          localStorage.setItem('token', user.token);
        }
        return user;
      })
    );
  }

  register(model: FormGroup): Observable<any> {
    return this._httpClient
      .post(this.baseUrl + '/Account/register', model)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            this.currentUser.set(user);
            localStorage.setItem('token', user.data.token);
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
