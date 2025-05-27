import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AuthService } from './core/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { NgxSpinnerComponent } from 'ngx-spinner';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'DatingAppUI';

  /**
   *
   */
  constructor(private _authService: AuthService) {}

  setCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) return;
    const user: any = jwtDecode(token);
    this._authService.currentUser.set(user);
  }

  ngOnInit(): void {
    this.setCurrentUser();
  }
}
