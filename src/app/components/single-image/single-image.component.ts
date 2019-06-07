import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Image } from 'src/app/models/image';

import { faHeart, faComment, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AngularFireDatabase } from '@angular/fire/database/database';
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
  images: Image[];

  activatedRoute: any;

  imageUrl: string;
  displayPhoto: string;

  constructor(private firebaseAuth: AngularFireAuth, public db: AngularFireDatabase, private route: ActivatedRoute) { }

  ngOnInit() {
    this.imageUrl = this.route.snapshot.queryParamMap.get('imageUrl');
    this.displayPhoto = this.imageUrl;

    this.firebaseAuth.user.subscribe(
      user => this.user = user
    );

    this.firebaseAuth.auth.onAuthStateChanged(user => {
      this.db.list<Image>(user.uid + '/files')
        .valueChanges()
        .subscribe(values => {
          this.images = values;
        });
    });

  }
}


