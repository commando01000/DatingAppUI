import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../../core/services/member.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../../interfaces/member';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DateFormatPipe } from '../../../core/pipes/date-format.pipe';
import { GalleryModule, GalleryItem, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-member-details',
  imports: [TabsModule, DateFormatPipe, GalleryModule],
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
