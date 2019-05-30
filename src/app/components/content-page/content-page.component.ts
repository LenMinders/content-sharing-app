import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { ToastrService } from 'ngx-toastr';

import { StorageService } from 'src/app/services/storage.service';
import { Image } from 'src/app/models/image';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.scss']
})

export class ContentPageComponent implements OnInit, OnDestroy {
  faPlusSquare = faPlusSquare;
  faSearch = faSearch;
  isSearchCollapsed = true;

  user: User;
  images: Image[];
  uploadSubsribtion: Subscription;
  imageSubsribtion: Subscription;

  constructor(private firebaseAuth: AngularFireAuth,
              public db: AngularFireDatabase,
              private storage: StorageService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.firebaseAuth.auth.onAuthStateChanged(user => {
      if (!user) {
        this.router.navigateByUrl('/login');
      } else {
        this.db.list<Image>(user.uid + '/files')
          .valueChanges()
          .subscribe(values => {
              this.images = values;
          });
      }
    });
    this.uploadSubsribtion = this.storage.isUploadedSource.subscribe(
      isUploaded => {
        if (isUploaded) {
          this.displayToast();
        }
      }
    );
  }

  ngOnDestroy() {
    this.uploadSubsribtion.unsubscribe();
  }

  uploadFile($event: any): void {
    this.storage.uploadFile($event.target.files[0]);
  }

  displayToast() {
    this.toastr.success('upload complete', 'Success!', {
      closeButton: true,
    });
  }
}
