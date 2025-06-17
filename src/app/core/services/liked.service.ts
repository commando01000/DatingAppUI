import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LikedService {
  baseUrl = environment.baseUrl;

  likeIds = signal<string[]>([]);

  constructor(private _httpClient: HttpClient) {}

  toggleLike(id: string): Observable<any> {
    // debugger;
    var UserLikeSpec = {
      LikedUserId: id,
    };
    return this._httpClient.post(
      this.baseUrl + '/UserLike/LikeUser',
      UserLikeSpec
    );
  }

  getLikes(predicate: string): Observable<any> {
    return this._httpClient.get(
      this.baseUrl + '/UserLike' + '/GetUserLikes?predicate=' + predicate
    );
  }

  getLikeIds() {
    return this._httpClient
      .get(this.baseUrl + '/UserLike/GetCurrentUserLikesIds?predicate=source')
      .subscribe({
        next: (response: any) => {
          this.likeIds.set(response);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('Request Completed');
        },
      });
  }
}
