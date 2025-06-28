import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { User } from '../../interfaces/user';
import { jwtDecode } from 'jwt-decode';
import { LikedService } from './liked.service';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _httpClient: HttpClient,
    private _likedService: LikedService,
    private _presenceService: PresenceService
  ) {}

  currentUser = signal<User | null>(null);

  baseUrl = environment.baseUrl;
  login(model: FormGroup): Observable<any> {
    return this._httpClient.post(this.baseUrl + '/Account/login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          let CurrentUser = user;
          this.setCurrentUser(CurrentUser);
        }
        return user;
      })
    );
  }

  setCurrentUser(user: User) {
    var decodedUser = jwtDecode(user.token) as User;
    decodedUser.token = user.token;
    this.currentUser.set(decodedUser);
    localStorage.setItem('token', user.token);
    this._presenceService.createHubConnection(decodedUser);
    this._likedService.getLikeIds();
  }

  register(model: FormGroup): Observable<any> {
    return this._httpClient
      .post(this.baseUrl + '/Account/register', model)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            this.setCurrentUser(user.data);
          }
          return user;
        })
      );
  }

  logout() {
    this.currentUser.set(null);
    this._presenceService.stopHubConnection();
    localStorage.removeItem('token');
  }
}
