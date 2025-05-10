import { Component, OnInit, Renderer2 } from '@angular/core';
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
import { ToastrService } from 'ngx-toastr';

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
    Id: new FormControl('', []),
    Bio: new FormControl('', []),
    LookingFor: new FormControl('', []),
    Interests: new FormControl('', []),
    Address: new FormGroup({
      City: new FormControl('', []),
      Street: new FormControl('', []),
    }),
  });
  /**
   *
   */
  constructor(
    private _memberService: MemberService,
    private _AuthService: AuthService,
    private _toastr: ToastrService,
    private _renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const memberId = this._AuthService.currentUser()?.Id;
    this._memberService.getMemberById(memberId || '').subscribe({
      next: (response) => {
        console.log(response);
        if (response.status) {
          this.member = response.data.items[0] as Member;
          // Update the form values after data is loaded
          this.editProfileForm.patchValue({
            Id: this.member?.id,
            Bio: this.member?.bio,
            LookingFor: this.member?.lookingFor,
            Interests: this.member?.interests,
            Address: {
              City: this.member?.address?.city,
              Street: this.member?.address?.street,
            },
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
    var spinner = this._renderer2.selectRootElement('.spinner-border');
    spinner.classList.remove('d-none');
    spinner.classList.add('d-inline-block');
    this._memberService.updateMember(this.editProfileForm.value).subscribe({
      next: (response) => {
        if (response.status) {
          this._toastr.success('Profile updated successfully');
        }
      },
      error: (error) => {
        console.log(error);
        this._toastr.error(error.error.title);
        spinner.classList.remove('d-inline-block');
        spinner.classList.add('d-none');
      },
      complete: () => {
        console.log('Request Completed');
        spinner.classList.remove('d-inline-block');
        spinner.classList.add('d-none');
      },
    });
  }
}
