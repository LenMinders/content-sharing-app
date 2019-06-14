import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Image } from 'src/app/models/image';
import { faHeart, faComment, faUserCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  values: string;
  user: User;
  image: Image[];

  faHeart = faHeart;
  faComment = faComment;
  faUserCircle = faUserCircle;
  images: Image[];

  constructor(
    private firebaseAuth: AngularFireAuth,
    public db: AngularFireDatabase,
  ) { }

  ngOnInit() {
    this.firebaseAuth.auth.onAuthStateChanged(user => {
      this.db.list<Image>(user.uid + '/files')
        .valueChanges()
        .subscribe(values => {
          this.images = values;
        });
    });

    this.firebaseAuth.user.subscribe(
      user => this.user = user
    );
  }

  onKey(value: string) {
    this.values = value + ' | ';
    if (value.includes('')) {

    }
  }
}
