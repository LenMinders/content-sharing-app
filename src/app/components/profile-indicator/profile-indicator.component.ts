import { Component, OnInit } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-indicator',
  templateUrl: './profile-indicator.component.html',
  styleUrls: ['./profile-indicator.component.scss']
})
export class ProfileIndicatorComponent implements OnInit {
  user: User;
  faUserCircle: any;

  constructor(private router: ActivatedRoute) {
    this.faUserCircle = faUserCircle;
    this.user = {
      displayName: '',
      email: '',
      photoURL: ''
    };
  }

  ngOnInit() {
    this.router.params.subscribe(
      parameters => {
        this.user.displayName = parameters.displayName;
        this.user.email = parameters.email;
        this.user.photoURL = parameters.photoUrl;
      }
    );
  }

}
