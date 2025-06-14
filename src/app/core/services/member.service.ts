import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Member } from '../../interfaces/member';
import { PaginatedResult } from '../../interfaces/pagination';
import { UserParams } from '../../interfaces/user-params';

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

  getMembers(userParams?: UserParams) {
    let params = new URLSearchParams();
    if (userParams?.pageNumber != null && userParams?.pageSize != null) {
      params.set('PageIndex', userParams.pageNumber.toString());
      params.set('PageSize', userParams.pageSize.toString());
    }

    if (userParams?.gender != null) {
      params.set('Gender', userParams.gender);
    }

    if (userParams?.gender === '') {
      params.set('Gender', '');
    }

    if (userParams?.minAge != null) {
      params.set('MinAge', userParams.minAge.toString());
    }
    if (userParams?.maxAge != null) {
      params.set('MaxAge', userParams.maxAge.toString());
    }
    if (userParams?.orderBy != null) {
      params.set('OrderBy', userParams.orderBy);
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
