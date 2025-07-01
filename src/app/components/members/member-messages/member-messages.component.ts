import { Component, input, OnInit, ViewChild } from '@angular/core';
import { Message } from '../../../interfaces/message';
import { MessageService } from '../../../core/services/message.service';
import { PaginatedResult } from '../../../interfaces/pagination';
import { AuthService } from '../../../core/services/auth.service';
import { TimeagoModule } from 'ngx-timeago';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-messages',
  imports: [TimeagoModule, FormsModule],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.scss',
})
export class MemberMessagesComponent implements OnInit {
  userId = input.required<string>();
  // messages = input.required<Message[]>();
  messageContent: string = '';
  @ViewChild('messageForm') messageForm!: NgForm;

  constructor(
    public _messageService: MessageService,
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

  sendMessage() {
    this._messageService
      .SendMessage(this.userId(), this.messageContent)
      .then(() => {
        this.messageForm.reset();
      });
  }
}
