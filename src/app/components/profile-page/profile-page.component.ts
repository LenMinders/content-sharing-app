import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

import { Subscription } from 'rxjs';
import { faCheck, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import { Image } from 'src/app/models/image';
import { User } from 'src/app/models/user';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})

export class ProfilePageComponent implements OnInit, OnDestroy {
  faCheck = faCheck;
  faEllipsisV = faEllipsisV;

  removing = false;
  user: User;
  images: Image[];
  deleteMode = false;
  isDeleting: boolean;

  isDeletingSubscription: Subscription;

  constructor(
    public db: AngularFireDatabase,
    private eventService: EventsService,
    private firebaseAuth: AngularFireAuth) { }

  ngOnInit() {
    this.firebaseAuth.auth.onAuthStateChanged(user => {
      this.user = user;
      this.db.list<Image>( '/users/' + user.uid + '/files')
        .valueChanges()
        .subscribe(values => {
          this.images = values;
        });
    });

    this.eventService.currentDeleteMode.subscribe( currentDeleteMode => {
      this.deleteMode = currentDeleteMode;
    });

    this.isDeletingSubscription = this.eventService.currentIsDeleting.subscribe(x => {
      this.isDeleting = x;
    });
  }

  ngOnDestroy() {
    this.isDeletingSubscription.unsubscribe();
  }

  selectFile(imageName: any) {
    if (this.checkSelectedImage(imageName)) {
      this.deSelectFile(imageName);
    } else {
      this.eventService.setSelectedImages(imageName);
    }
  }

  deSelectFile(imageName: string) {
    this.eventService.removeSelectedImage(imageName);
  }

  checkSelectedImage(imageName: string) {
    return this.eventService.getSelectedImages().includes(imageName);
  }

  toggleDelete() {
    this.eventService.setDeleteMode(true);
  }

  logOut() {
    this.firebaseAuth.auth.signOut();
  }
}
