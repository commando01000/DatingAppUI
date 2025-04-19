import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'DatingAppUI';

  /**
   *
   */
  constructor(private _httpClient: HttpClient) {}
  ngOnInit(): void {
    this._httpClient.get('https://localhost:7120/api/Account/users').subscribe({
      next: (response) => {
        console.log(response);
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
