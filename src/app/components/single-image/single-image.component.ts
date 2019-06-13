import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { faHeart, faComment, faUserCircle, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EventsService } from 'src/app/services/events.service';
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-single-image',
  templateUrl: './single-image.component.html',
  styleUrls: ['./single-image.component.scss']
})
export class SingleImageComponent implements OnInit {
  faHeart = faHeart;
  faComment = faComment;
  faUserCircle = faUserCircle;
  faEllipsisV = faEllipsisV;

  user: User;
  activatedRoute: any;
  imageUrl: string;
  imageName: string;
  displayPhoto: string;
  description: string;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private modalService: NgbModal,
    private db: AngularFireDatabase) { }

  ngOnInit() {
    this.imageUrl = this.route.snapshot.queryParamMap.get('imageUrl');
    this.imageName = this.route.snapshot.queryParamMap.get('imageName');
    this.displayPhoto = this.imageUrl;

    this.firebaseAuth.user.subscribe(user => {
      this.user = user;
      this.retrievePostDescription();
    });

  }

  deletePost(): void {
    this.eventsService.deletePhotos([this.imageName]);
  }

  openConfirmModal() {
    this.modalService.open(ConfirmDeleteModalComponent).result
      .then((result) => {
        this.deletePost();
      }, (reason) => {
        // modal closed
      });
  }

  retrievePostDescription() {
    this.db.database.ref(this.user.uid + '/files/' + this.imageName.split('.')[0]).once('value')
      .then((snapshot) => {
        this.description = snapshot.val().description;
      });
  }
}


