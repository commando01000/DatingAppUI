import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  /**
   *
   */
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this._authService.currentUser() != null
      ? (this.loggedIn = true)
      : (this.loggedIn = false);
  }

  loggedIn: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    ]),
  });

  Login(): void {
    console.log(this.loginForm.value);

    this._authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.loggedIn = true;
        this.loginForm.reset();
        this._router.navigate(['/members']);
      },
      error: (error) => {
        console.log(error);
        this._toastr.error( error.error.title);
      },
      complete: () => {
        console.log('Request Completed');
      },
    });
  }

  Logout(): void {
    this._authService.logout();
  }
}
