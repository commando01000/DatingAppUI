import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Member } from '../../interfaces/member';
import { PaginatedResult } from '../../interfaces/pagination';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private _httpClient: HttpClient) {}

  baseUrl = environment.baseUrl;
  paginatedResults = signal<PaginatedResult<Member>>(
    new PaginatedResult<Member>()
  );

  // members = signal<Member[]>([]); used paginated result instead !

  getMembers(pageNumber: number = 1, pageSize: number = 5) {
    let params = new URLSearchParams();
    if (pageNumber != null && pageSize != null) {
      params.set('PageIndex', pageNumber.toString());
      params.set('PageSize', pageSize.toString());
    }
    this._httpClient
      .get(this.baseUrl + '/Members/members?' + params)
      .subscribe({
        next: (response: any) => {
          this.paginatedResults.set(response.data);
          console.log(this.paginatedResults());
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('Request Completed');
        },
      });
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

  setMainPhoto(photoId: number): Observable<any> {
    return this._httpClient.put(
      this.baseUrl + '/Members/SetMainPhoto?photoId=' + photoId,
      {}
    );
  }

  deletePhoto(publicId: string): Observable<any> {
    return this._httpClient.delete(
      this.baseUrl + '/Members/DeletePhoto?publicId=' + publicId
    );
  }
}
