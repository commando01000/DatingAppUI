import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../../interfaces/member';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-member-card',
  imports: [RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss',
})
export class MemberCardComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}

  @Input() member: Member | undefined;
}
