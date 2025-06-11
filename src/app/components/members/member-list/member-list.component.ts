import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../../core/services/member.service';
import { Member } from '../../../interfaces/member';
import { MemberCardComponent } from '../member-card/member-card.component';
import { PaginatedResult } from '../../../interfaces/Pagination';

@Component({
  selector: 'app-member-list',
  imports: [MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss',
})
export class MemberListComponent implements OnInit {
  constructor(private _MemberService: MemberService) {}

  get members() {
    return this._MemberService.paginatedResults();
  }

  ngOnInit(): void {
    // Trigger loading only
    if (!this.members.items?.length) {
      this._MemberService.getMembers();
    }
  }
}
