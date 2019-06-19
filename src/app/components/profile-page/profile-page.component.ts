import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { Image } from 'src/app/models/image';
import { User } from 'src/app/models/user';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})

export class ProfilePageComponent implements OnInit {
  faCheck = faCheck;
  removing = false;
  user: User;
  images: Image[];

  constructor(
    public db: AngularFireDatabase,
    public eventService: EventsService,
    private firebaseAuth: AngularFireAuth) { }

  ngOnInit() {
    this.firebaseAuth.auth.onAuthStateChanged(user => {
      this.db.list<Image>(user.uid + '/files')
        .valueChanges()
        .subscribe(values => {
          this.images = values;
        });
    });
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
}
