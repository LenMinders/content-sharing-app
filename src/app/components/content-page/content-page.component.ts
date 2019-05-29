import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

import { StorageService } from 'src/app/services/storage.service';
import { Image } from 'src/app/models/image';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.scss']
})

export class ContentPageComponent implements OnInit {
  faPlusSquare = faPlusSquare;
  faSearch = faSearch;
  isSearchCollapsed = true;

  user: User;
  firebaseStorage: any;
  images: Image[];

  constructor(private firebaseAuth: AngularFireAuth,
              public db: AngularFireDatabase,
              private storage: StorageService,
              private router: Router) {}

  ngOnInit() {
    this.firebaseAuth.auth.onAuthStateChanged(user => {
    if (!user) {
      this.router.navigateByUrl('/login');
    } else {
      const email = user.email.replace(/\./g, '_');
      this.firebaseStorage = this.db.list<Image>(email)
      .valueChanges()
      .subscribe(values => {
          this.images = values;
      });
    }
  });
}

  uploadFile($event: any): void {
    this.storage.uploadFile($event.target.files[0]);
  }
}
