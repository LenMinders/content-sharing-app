import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { faHeart, faComment, faUserCircle, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EventsService } from 'src/app/services/events.service';
import { ModalInfoService } from 'src/app/services/modal-info.service';
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';
import { PhotoInfoModalComponent } from '../photo-info-modal/photo-info-modal.component';
import { User } from 'src/app/models/user';
import { Image } from 'src/app/models/image';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-image',
  templateUrl: './single-image.component.html',
  styleUrls: ['./single-image.component.scss']
})
export class SingleImageComponent implements OnInit, OnDestroy {
  faHeart = faHeart;
  faComment = faComment;
  faUserCircle = faUserCircle;
  faEllipsisV = faEllipsisV;

  user: User;
  activatedRoute: any;
  imageUrl: string;
  imageName: string;
  image: Image;

  firebaseUserSubscription: Subscription;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private modalInfoService: ModalInfoService,
    private modalService: NgbModal,
    private db: AngularFireDatabase,
    private http: HttpClient) { }

  ngOnInit() {
    this.imageUrl = this.route.snapshot.queryParamMap.get('imageUrl');
    this.imageName = this.route.snapshot.queryParamMap.get('imageName');

    this.firebaseUserSubscription = this.firebaseAuth.user.subscribe(user => {
      this.user = user;
      this.retrievePostInfo();
    });

  }

  ngOnDestroy() {
    this.firebaseUserSubscription.unsubscribe();
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

  retrievePostInfo() {
    this.db.database.ref(this.user.uid + '/files/' + this.imageName.split('.')[0]).once('value')
      .then((snapshot) => {
        this.image = snapshot.val();
      });
  }

  openPhotoInfoModal() {
    this.modalInfoService.setPhotoInfo(this.image);
    this.modalService.open(PhotoInfoModalComponent);
  }

  downloadImage() {
    this.getImage(this.imageUrl)
      .subscribe((response) => {
        const blob = new Blob([response], { type: 'application/octet-stream' });
        const a = this.createDownloadableLink();
        a.href = window.URL.createObjectURL(blob);
        a.download = this.imageName;
        a.click();
        window.URL.revokeObjectURL(this.imageUrl);
      });
  }

  getImage(url: any) {
    return this.http.get(`https://cors-anywhere.herokuapp.com/${url}`, { responseType: 'blob' });
  }

  createDownloadableLink() {
    const a = document.createElement('a');
    a.style.display = 'none';
    document.body.appendChild(a);
    return a;
  }
}
