import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { Image } from 'src/app/models/image';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})

export class ProfilePageComponent implements OnInit {
  faTrash = faTrash;
  removing = true;
  user: User;
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
  }
}
