import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

import { faHeart, faComment, faUserCircle, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';

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
    private eventsService: EventsService) { }

  ngOnInit() {
    this.imageUrl = this.route.snapshot.queryParamMap.get('imageUrl');
    this.imageName = this.route.snapshot.queryParamMap.get('imageName');
    this.displayPhoto = this.imageUrl;

    this.firebaseAuth.user.subscribe(
      user => this.user = user
    );
  }

  onDeletePostClicked(): void {
    this.eventsService.deletePhotos([this.imageName]);
  }
}


