import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  constructor(private _toastService: ToastrService) {}
  private _hubConnection!: HubConnection;

  hubUrl = environment.hubsUrl;

  onlineUsers = signal<string[]>([]);
  createHubConnection(user: User) {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + '/presence', {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this._hubConnection
      .start()
      .catch((error) => console.log(error))
      .finally(() => console.log('Connection has been established.'));

    this._hubConnection.on('UserIsOnline', (username) => {
      this._toastService.info(username + ' has connected');
    });

    this._hubConnection.on('UserIsOffline', (username) => {
      this._toastService.info(username + ' has disconnected');
    });

    this._hubConnection.on('GetOnlineUsers', (users: string[]) => {
      this.onlineUsers.set(users);
    });
  }

  stopHubConnection() {
    if (this._hubConnection) {
      this._hubConnection.stop().catch((error) => console.log(error));
    }
  }
}
