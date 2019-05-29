import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { AngularFireDatabase } from 'angularfire2/database';
import { User } from 'src/app/models/user';
import { AngularFireAuth } from '@angular/fire/auth';

export interface Image {
  id: string;
  imageUrl: string;
}

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.scss']
})

export class ContentPageComponent implements OnInit {
  faSearch = faSearch;

  user: User;
  firebaseStorage: any;
  images: Image[];

  constructor(private firebaseAuth: AngularFireAuth, public db: AngularFireDatabase) {}

  ngOnInit() {
   const email = this.firebaseAuth.auth.currentUser.email.replace(/\./g, '_');
   console.log(email);
   this.firebaseStorage = this.db.list<Image>(email)
   .valueChanges()
   .subscribe(values => {
        this.images = values;
    });
  }
}
