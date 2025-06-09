import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormControlOptions,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  /**
   *
   */
  constructor(private _authService: AuthService, private _router: Router, private _toastr: ToastrService) {}

  @Output() registerModee = new EventEmitter<boolean>(); // Emit a boolean value

  registerForm: FormGroup = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
      ]),
      RePassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
      ]),
    },
    {
      // match passwords validator
      validators: this.matchPasswords,
    } as FormControlOptions
  );

  matchPasswords(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('RePassword')?.value;
    return password === confirmPassword ? null : { notSame: true };
  }

  register(): void {
    console.log(this.registerForm.value);
    this._authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.registerModee.emit(false);
      },
      error: (error) => {
        console.log(error);
        this._toastr.error(error.error.title);
      },
      complete: () => {
        console.log('Request Completed');
      },
    });
  }

  cancel(): void {
    this.registerModee.emit(false);
  }
}
