import { Component, OnInit } from '@angular/core';
import { Member } from '../../../interfaces/member';
import { MemberService } from '../../../core/services/member.service';
import { AuthService } from '../../../core/services/auth.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { DateFormatPipe } from '../../../pipes/date-format.pipe';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  imports: [TabsModule, DateFormatPipe, GalleryModule, ReactiveFormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.scss',
})
export class MemberEditComponent implements OnInit {
  member?: Member;
  Images: GalleryItem[] = [];
  editProfileForm: FormGroup = new FormGroup({
    bio: new FormControl('', []),
    lookingFor: new FormControl('', []),
    interests: new FormControl('', []),
    city: new FormControl('', []),
    street: new FormControl('', []),
  });
  /**
   *
   */
  constructor(
    private _memberService: MemberService,
    private _AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const memberId = this._AuthService.currentUser()?.Id;
    this._memberService.getMemberById(memberId || '').subscribe({
      next: (response) => {
        if (response.status) {
          this.member = response.data.items[0] as Member;

          // Update the form values after data is loaded
          this.editProfileForm.patchValue({
            bio: this.member?.bio,
            lookingFor: this.member?.lookingFor,
            interests: this.member?.interests,
            city: this.member?.address?.city,
            street: this.member?.address?.street,
          });

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

  Edit() {
    console.log(this.editProfileForm.value);
  }
}
