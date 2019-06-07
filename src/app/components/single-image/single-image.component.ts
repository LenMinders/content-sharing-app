import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

import { faHeart, faComment, faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-single-image',
  templateUrl: './single-image.component.html',
  styleUrls: ['./single-image.component.scss']
})
export class SingleImageComponent implements OnInit {

  faHeart = faHeart;
  faComment = faComment;
  faUserCircle = faUserCircle;

  user: User;
  photo = '../../../assets/images/forrest-portrait.jpeg';

  constructor(private firebaseAuth: AngularFireAuth) { }

  ngOnInit() {
    this.firebaseAuth.user.subscribe(
      user => this.user = user
    );
  }
}


