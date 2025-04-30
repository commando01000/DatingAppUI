import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../../interfaces/member';

@Component({
  selector: 'app-member-card',
  imports: [],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss',
})
export class MemberCardComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}

  @Input() member: Member | undefined;
}
