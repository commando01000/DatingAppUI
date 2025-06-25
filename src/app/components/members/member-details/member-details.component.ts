import { Component, OnInit, ViewChild } from '@angular/core';
import { MemberService } from '../../../core/services/member.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../../interfaces/member';
import { TabDirective, TabsModule } from 'ngx-bootstrap/tabs';
import { DateFormatPipe } from '../../../core/pipes/date-format.pipe';
import { GalleryModule, GalleryItem, ImageItem } from 'ng-gallery';
import { MemberMessagesComponent } from '../member-messages/member-messages.component';
import { Message } from '../../../interfaces/message';
import { MessageService } from '../../../core/services/message.service';
import { AuthService } from '../../../core/services/auth.service';
import { PaginatedResult } from '../../../interfaces/pagination';

@Component({
  selector: 'app-member-details',
  imports: [TabsModule, DateFormatPipe, GalleryModule, MemberMessagesComponent],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.scss',
})
export class MemberDetailsComponent implements OnInit {
  ngOnInit(): void {
    this.loadMemberData();
  }

  constructor(
    private _memberService: MemberService,
    private _messageService: MessageService,
    private _authService: AuthService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  member: Member | undefined;
  @ViewChild('messagesTab') messagesTab: HTMLElement | undefined;
  activeTab?: TabDirective;
  messages: Message[] = [];

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    const memberId = this._ActivatedRoute.snapshot.paramMap.get('id') || '';
    if (
      this.activeTab.heading == 'Messages' &&
      this.messages.length === 0 &&
      this.member
    ) {
      this._messageService
        .getMessageThread(this._authService.currentUser()!.Id, memberId)
        .subscribe({
          next: (messages: any) => {
            const myMessages = messages as PaginatedResult<Message>;
            if (myMessages.items !== undefined) {
              this.messages = myMessages.items;
            } else {
              this.messages = [];
            }
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

  Images: GalleryItem[] = [];
  loadMemberData() {
    const memberId = this._ActivatedRoute.snapshot.paramMap.get('id');
    this._memberService.getMemberById(memberId || '').subscribe({
      next: (response) => {
        if (response.status) {
          this.member = response.data.items[0] as Member;

          for (let i = 0; i < this.member?.photos?.length; i++) {
            this.Images.push(
              new ImageItem({
                src: this.member?.photos[i].url,
                thumb: this.member?.photos[i].url,
              })
            );
          }
        }
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
