import { Component, OnInit } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-indicator',
  templateUrl: './profile-indicator.component.html',
  styleUrls: ['./profile-indicator.component.scss']
})
export class ProfileIndicatorComponent implements OnInit {
  faUserCircle = faUserCircle;

  constructor() { }

  ngOnInit() {
  }

}
