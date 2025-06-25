import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { PaginatedResult } from '../../interfaces/pagination';
import { Message } from '../../interfaces/message';

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

  deleteMessage(id: string) {
    this._httpClient
      .delete(
        this.baseUrl + '/Messages/DeleteMessage?messageId=' + id.toString()
      )
      .subscribe({
        next: () => {
          // window.location.reload();
          this.PaginatedResult.update((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              items: prev.items?.filter((m) => m.id.toString() !== id),
            };
          });
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
