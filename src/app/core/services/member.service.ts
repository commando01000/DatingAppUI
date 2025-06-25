import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable, filter } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Member } from '../../interfaces/member';
import { PaginatedResult } from '../../interfaces/pagination';
import { UserParams } from '../../interfaces/user-params';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(
    private _httpClient: HttpClient,
    private _authService: AuthService
  ) {}

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
          // do not show the current user
          const paginatedResult = response.data as PaginatedResult<Member>;
          var currentUser = this._authService.currentUser();
          if (currentUser != null) {
            response.items = paginatedResult?.items?.filter((m: any) => {
              return m.id != currentUser?.Id;
            });
          }
          this.paginatedResults.set(response);
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
