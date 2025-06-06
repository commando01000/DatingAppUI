import { Component, input, OnInit, output } from '@angular/core';
import { Member } from '../../../interfaces/member';
import { DecimalPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';

import { FileUploader, FileUploadModule } from 'ng2-file-upload'; // import FileUploadModule from 'ng2-file-upload';
import { AuthService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment.development';
import { MemberService } from '../../../core/services/member.service';
import { Photo } from '../../../interfaces/photo';
@Component({
  selector: 'app-photo-editor',
  imports: [NgIf, NgFor, NgStyle, NgClass, FileUploadModule, DecimalPipe],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.scss',
})
export class PhotoEditorComponent implements OnInit {
  member = input.required<Member>();

  // output property
  memberChange = output<Member>();
  uploader?: FileUploader;

  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  baseUrl = environment.baseUrl;

  /**
   *
   */
  constructor(
    private _authService: AuthService,
    private _memberService: MemberService
  ) {}
  ngOnInit(): void {
    this.initializeUploader();
  }

  setMainPhoto(Photo: Photo) {
    this._memberService.setMainPhoto(Photo.id).subscribe({
      next: (response) => {
        if (response) {
          const user = this._authService.currentUser();
          if (user) {
            user.PhotoUrl = Photo.url;
            this._authService.currentUser.set(user);
          }
          var updatedMember = { ...this.member() };

          updatedMember.photoUrl = Photo.url;

          this.member().photos.forEach((p) => {
            if (p.isMain) {
              p.isMain = false;
            }
            if (p.id === Photo.id) {
              p.isMain = true;
            }
          });
          this.memberChange.emit(updatedMember);
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

  deletePhoto(Photo: Photo) {
    this._memberService.deletePhoto(Photo.publicId).subscribe({
      next: (response) => {
        if (response) {
          this.member().photos = this.member().photos.filter(
            (p) => p.id !== Photo.id
          );
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

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    debugger;
    this.uploader = new FileUploader({
      url: this.baseUrl + '/Members/AddPhoto',
      authToken: 'Bearer ' + this._authService.currentUser()?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        // this.member().photos.push(photo); // use the output property instead
        const updatedMember = { ...this.member() };
        updatedMember.photos.push(photo?.data);
        this.memberChange.emit(updatedMember);
      }
    };
  }
}
