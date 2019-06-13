import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Image } from 'src/app/models/image';
import { User } from 'src/app/models/user';
import { EventsService } from 'src/app/services/events.service';
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})

export class ProfilePageComponent implements OnInit {
  faTrash = faTrash;
  removing = false;
  user: User;
  images: Image[];
  selectedImages: string[];

  constructor(
    public db: AngularFireDatabase,
    private firebaseAuth: AngularFireAuth,
    private eventService: EventsService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.firebaseAuth.auth.onAuthStateChanged(user => {
      this.db.list<Image>(user.uid + '/files')
        .valueChanges()
        .subscribe(values => {
          this.images = values;
        });
    });
    this.selectedImages = [];
  }

  selectFile(imageName: any) {
    if (this.selectedImages.includes(imageName)) {
      this.deSelectFile(imageName);
    } else {
      this.selectedImages.push(imageName);
    }
  }

  deSelectFile(imageName: string) {
    this.selectedImages = this.selectedImages.filter((value) => {
      return value !== imageName;
    });
  }

  deletePost() {
    this.eventService.deletePhotos(this.selectedImages);
    this.eventService.deleteMode = false;
  }

  openConfirmModal() {
    this.modalService.open(ConfirmDeleteModalComponent).result
      .then((result) => {
        this.deletePost();
      }, (reason) => {
        // modal closed
      });
  }

  onCancel() {
    this.eventService.deleteMode = false;
  }
}
