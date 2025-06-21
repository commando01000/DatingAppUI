import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../core/services/message.service';
import { PaginatedResult } from '../../interfaces/pagination';
import { Message } from '../../interfaces/message';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule } from '@angular/forms';
import { TimeagoModule } from 'ngx-timeago';
import { RouterLink } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';
@Component({
  selector: 'app-messages',
  imports: [
    ButtonsModule,
    FormsModule,
    RouterLink,
    PaginationModule,
    TimeagoModule,
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent implements OnInit {
  container: string = 'Outbox';
  pageNumber = 1;
  pageSize = 5;
  PaginatedResult: PaginatedResult<Message[]> | null = null;

  constructor(private _messageService: MessageService) {}
  ngOnInit(): void {
    this.loadMessages();
  }

  get PaginatedResults() {
    return this._messageService.PaginatedResult;
  }

  loadMessages() {
    this._messageService.PaginatedResult.set(null);
    this._messageService.getMessages(
      this.pageNumber,
      this.pageSize,
      this.container
    );
  }

  deleteMessage(id: number) {}

  getRoute(message: Message) {
    this.container == 'Outbox'
      ? `/Members/members/${message.recipientId}`
      : `/Members/members/${message.senderId}`;
  }

  pageChanged(event: any) {
    if (event.page == this.pageNumber) return;
    this.loadMessages();
  }
}
