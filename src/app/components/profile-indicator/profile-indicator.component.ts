import { Component, OnInit } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-profile-indicator',
  templateUrl: './profile-indicator.component.html',
  styleUrls: ['./profile-indicator.component.scss']
})
export class ProfileIndicatorComponent implements OnInit {
  faUserCircle = faUserCircle;
  user: User;

  constructor(private firebaseAuth: AngularFireAuth) { }

  ngOnInit() {
    this.firebaseAuth.user.subscribe(
      user => this.user = user
    );
  }

}
