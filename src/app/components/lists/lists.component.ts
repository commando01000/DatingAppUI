import { Component, OnInit, signal } from '@angular/core';
import { LikedService } from '../../core/services/liked.service';
import { Member } from '../../interfaces/member';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { MemberCardComponent } from '../members/member-card/member-card.component';

@Component({
  selector: 'app-lists',
  imports: [FormsModule, MemberCardComponent, ButtonsModule],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss',
})
export class ListsComponent implements OnInit {
  /**
   *
   */
  constructor(private _likedService: LikedService) {}
  ngOnInit(): void {
    this.loadLikes();
  }

  members = signal<Member[]>([]);
  // predicate to be updated from ng model
  predicate = 'source';

  getTitle() {
    switch (this.predicate) {
      case 'source':
        return 'Members I like';
      case 'liked':
        return 'Members who like me';
      case 'mutual':
        return 'Mutual likes';
      default:
        return 'Members I like';
    }
  }

  loadLikes() {
    this._likedService.getLikes(this.predicate).subscribe({
      next: (response: any) => {
        // debugger;
        this.members.set(response);
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
