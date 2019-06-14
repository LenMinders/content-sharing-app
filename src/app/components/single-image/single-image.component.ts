import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private firebaseAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.imageUrl = this.route.snapshot.queryParamMap.get('imageUrl');
    this.imageName = this.route.snapshot.queryParamMap.get('imageName');
    this.displayPhoto = this.imageUrl;

    this.firebaseAuth.user.subscribe(
      user => this.user = user
    );
  }

  openConfirmModal() {
    this.modalService.open(ConfirmDeleteModalComponent).result
      .then((result) => {
        this.eventsService.setSelectedImages(this.imageName);
        this.eventsService.deletePhotos();
      }, (reason) => {
        // modal closed
      });
  }
}


