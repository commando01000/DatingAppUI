import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private _httpClient: HttpClient) {}

  baseUrl = environment.baseUrl;
  getMembers(): Observable<any> {
    return this._httpClient.get(this.baseUrl + '/Members/members');
  }

  getMembersByGender(gender: string): Observable<any> {
    return this._httpClient.get(this.baseUrl + '/members?gender=' + gender);
  }
}
