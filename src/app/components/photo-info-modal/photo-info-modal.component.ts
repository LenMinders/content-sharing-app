import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { ModalInfoService } from 'src/app/services/modal-info.service';
import { Image } from 'src/app/models/image';

@Component({
  selector: 'app-photo-info-modal',
  templateUrl: './photo-info-modal.component.html',
  styleUrls: ['./photo-info-modal.component.scss']
})
export class PhotoInfoModalComponent implements OnInit, OnDestroy {
  photoInfoSubscription: Subscription;
  image: Image;

  constructor(public modal: NgbActiveModal, private modalInfoService: ModalInfoService) { }

  ngOnInit() {
    this.photoInfoSubscription = this.modalInfoService.currentPhotInfo.subscribe(x => {
      this.image = x;
    });
  }

  ngOnDestroy() {
    this.photoInfoSubscription.unsubscribe();
  }
}
