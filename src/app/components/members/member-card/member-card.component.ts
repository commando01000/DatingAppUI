import { Component, computed, Input, OnInit } from '@angular/core';
import { Member } from '../../../interfaces/member';
import { RouterLink } from '@angular/router';
import { LikedService } from '../../../core/services/liked.service';
import { PresenceService } from '../../../core/services/presence.service';

@Component({
  selector: 'app-member-card',
  imports: [RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss',
})
export class MemberCardComponent implements OnInit {
  constructor(
    private _likedService: LikedService,
    private _presenceService: PresenceService
  ) {}
  ngOnInit(): void {}

  @Input() member: Member | undefined;

  hasLikes = computed(() =>
    this._likedService.likeIds().includes(this.member!.id)
  );

  isOnline = computed(() =>
    this._presenceService.onlineUsers().includes(this.member!.displayName)
  );

  toggleLike(LikedUserId: string) {
    this._likedService.toggleLike(LikedUserId).subscribe({
      next: () => {
        if (this.hasLikes()) {
          this._likedService.likeIds.update((ids) =>
            ids.filter((id) => id !== LikedUserId)
          );
        } else {
          this._likedService.likeIds.update((ids) => [...ids, LikedUserId]);
        }
      },
    });
  }
}
