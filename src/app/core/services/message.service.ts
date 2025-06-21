import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { PaginatedResult } from '../../interfaces/pagination';
import { Message } from '../../interfaces/message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private _httpClient: HttpClient) {}

  baseUrl = environment.baseUrl;
  PaginatedResult = signal<PaginatedResult<Message> | null>(null);

  getMessages(pageIndex: number, pageSize: number, container: string) {
    let params = new URLSearchParams();
    params.set('PageIndex', pageIndex.toString());
    params.set('PageSize', pageSize.toString());
    params.set('Container', container);
    return this._httpClient
      .get(this.baseUrl + '/Messages/GetMessagesForUser' + '?' + params)
      .subscribe({
        next: (response: any) => {
          this.PaginatedResult.set(response);
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
