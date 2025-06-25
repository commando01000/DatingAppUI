import { Component, input, OnInit } from '@angular/core';
import { Message } from '../../../interfaces/message';
import { MessageService } from '../../../core/services/message.service';
import { PaginatedResult } from '../../../interfaces/pagination';
import { AuthService } from '../../../core/services/auth.service';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-member-messages',
  imports: [TimeagoModule],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.scss',
})
export class MemberMessagesComponent implements OnInit {
  userId = input.required<string>();
  messages = input.required<Message[]>();

  constructor(
    private _messageService: MessageService,
    private _authService: AuthService
  ) {}
  ngOnInit(): void {
    // this.loadMessage();
  }

  // loadMessage() {
  //   this._messageService
  //     .getMessageThread(this._authService.currentUser()!.Id, this.userId())
  //     .subscribe({
  //       next: (messages: any) => {
  //         const myMessages = messages as PaginatedResult<Message>;
  //         if (myMessages.items !== undefined) {
  //           // this.messages = myMessages.items;
  //         } else {
  //           // this.messages = [];
  //         }
  //       },
  //       error: (error) => {
  //         console.log(error);
  //       },
  //       complete: () => {
  //         console.log('Request Completed');
  //       },
  //     });
  // }
}
