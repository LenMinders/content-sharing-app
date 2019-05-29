import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { AngularFireDatabase } from '@angular/fire/database';
import { User } from 'src/app/models/user';
import { AngularFireAuth } from '@angular/fire/auth';

import { StorageService } from 'src/app/services/storage.service';
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
   const email = this.firebaseAuth.auth.currentUser.email.replace(/\./g, '_');
   console.log(email);
   this.firebaseStorage = this.db.list<Image>(email)
   .valueChanges()
   .subscribe(values => {
        this.images = values;
    });

   const user = this.firebaseAuth.auth.currentUser;
   if (!user) {
      this.router.navigateByUrl('/login');
    }
  }

  uploadFile($event: any): void {
    this.storage.uploadFile($event.target.files[0]);
  }
}
