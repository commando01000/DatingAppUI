import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { PaginatedResult } from '../../interfaces/pagination';
import { Message } from '../../interfaces/message';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private _httpClient: HttpClient) {}

  baseUrl = environment.baseUrl;
  private _hubConnection!: HubConnection;
  PaginatedResult = signal<PaginatedResult<Message> | null>(null);
  hubUrl: string = environment.hubsUrl;
  messageThread = signal<Message[]>([]);

  createHubConnection(user: User, otherUserName: string) {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + '/message?user=' + otherUserName, {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this._hubConnection
      .start()
      .catch((error) => console.log(error))
      .finally(() => console.log('Connection has been established.'));

    this._hubConnection.on(
      'ReceiveMessageThread',
      (messages: PaginatedResult<Message>) => {
        this.messageThread.set(messages.items!);
        // log the messageThread
      }
    );

    this._hubConnection.on('NewMessage', (message: any) => {
      console.log(message);
      this.messageThread.update((messages) => {
        if (messages) {
          console.log(messages);
          messages.push(message);
        }
        return messages;
      });
    });
  }

  SendMessage(RecipientId: string, content: string) {
    return this._hubConnection
      .invoke('SendMessage', { RecipientId, Content: content })
      .catch((error) => console.error('SendMessage error:', error));
  }

  stopHubConnection() {
    if (this._hubConnection) {
      this._hubConnection.stop().catch((error) => console.log(error));
    }
  }

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

  getMessageThread(senderId: string, recipientId: string) {
    return this._httpClient.get<Message[]>(
      this.baseUrl +
        '/Messages/GetMessagesThread?SenderId=' +
        senderId +
        '&RecipientId=' +
        recipientId
    );
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
