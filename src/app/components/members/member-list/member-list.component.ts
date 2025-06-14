import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../../core/services/member.service';
import { MemberCardComponent } from '../member-card/member-card.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { UserParams } from '../../../interfaces/user-params';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@Component({
  selector: 'app-member-list',
  imports: [MemberCardComponent, PaginationModule, FormsModule, ButtonsModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss',
})
export class MemberListComponent implements OnInit {
  constructor(private _MemberService: MemberService) {}

  userParams: UserParams = new UserParams();

  radioModel = 'Middle';

  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' },
    { value: '', display: 'All' },
  ];

  ngOnInit(): void {
    // Trigger loading only
    if (!this.members.items?.length) {
      this._MemberService.getMembers();
    }
  }

  get members() {
    return this._MemberService.paginatedResults();
  }

  resetFilters() {
    this._MemberService.getMembers();
  }

  loadMembers() {
    this._MemberService.getMembers(this.userParams);
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.userParams.pageSize = event.itemsPerPage;

    this._MemberService.getMembers(this.userParams);
  }
}
