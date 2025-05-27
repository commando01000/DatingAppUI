import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Member } from '../../interfaces/member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private _httpClient: HttpClient) {}

  baseUrl = environment.baseUrl;

  members = signal<Member[]>([]);
  getMembers(): Observable<any> {
    return this._httpClient.get(this.baseUrl + '/Members/members');
  }

  getMembersByGender(gender: string): Observable<any> {
    return this._httpClient.get(this.baseUrl + '/members?gender=' + gender);
  }
  getMemberById(id: string): Observable<any> {
    return this._httpClient.get(this.baseUrl + '/Members/members?id=' + id);
  }

  updateMember(member: FormGroup): Observable<any> {
    return this._httpClient.put(this.baseUrl + '/Members/update', member);
  }
}
