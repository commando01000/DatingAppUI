import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../../core/services/member.service';
import { Member } from '../../../interfaces/member';
import { MemberCardComponent } from '../member-card/member-card.component';

@Component({
  selector: 'app-member-list',
  imports: [ MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss',
})
export class MemberListComponent implements OnInit {
  /**
   *
   */
  constructor(private _MemberService: MemberService) {}
  ngOnInit(): void {
    this.loadMembers();
  }

  members : Member[] = [];

  loadMembers() {
    this._MemberService.getMembers().subscribe({
      next: (response) => {
        if(response.status)
        {
          this.members = response.data.items;
        }
        console.log(response);
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
