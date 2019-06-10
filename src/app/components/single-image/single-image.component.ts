import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

import { faHeart, faComment, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

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

  activatedRoute: any;

  imageUrl: string;
  displayPhoto: string;

  constructor(private firebaseAuth: AngularFireAuth, private route: ActivatedRoute) { }

  ngOnInit() {
    this.imageUrl = this.route.snapshot.queryParamMap.get('imageUrl');
    this.displayPhoto = this.imageUrl;

    this.firebaseAuth.user.subscribe(
      user => this.user = user
    );
  }
}


