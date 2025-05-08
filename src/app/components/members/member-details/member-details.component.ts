import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../../core/services/member.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../../interfaces/member';
import { TabsModule } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-member-details',
  imports: [TabsModule],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.scss',
})
export class MemberDetailsComponent implements OnInit {
  ngOnInit(): void {
    this.loadMemberData();
  }
  constructor(
    private _memberService: MemberService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  member: Member | undefined;
  loadMemberData() {
    const memberId = this._ActivatedRoute.snapshot.paramMap.get('id');
    this._memberService.getMemberById(memberId || '').subscribe({
      next: (response) => {
        if (response.status) {
          this.member = response.data.items[0];
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
