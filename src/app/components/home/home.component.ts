import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  /**
   *
   */
  constructor() {}

  registerMode: boolean = false;

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  register(): void {}

  cancel(): void {}

}
