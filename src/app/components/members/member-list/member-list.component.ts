import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../../core/services/member.service';
import { MemberCardComponent } from '../member-card/member-card.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-member-list',
  imports: [MemberCardComponent, PaginationModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss',
})
export class MemberListComponent implements OnInit {
  constructor(private _MemberService: MemberService) {}

  currentPage: number = 4;
  page?: number;

  get members() {
    return this._MemberService.paginatedResults();
  }

  ngOnInit(): void {
    // Trigger loading only
    if (!this.members.items?.length) {
      this._MemberService.getMembers();
    }
  }

  pageChanged(event: any) {
    this._MemberService.getMembers(event.page, event.itemsPerPage);
  }
}
