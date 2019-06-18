import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class ModalInfoService {
  image: Image;
  private photoInfoSource = new BehaviorSubject(this.image);
  currentPhotInfo = this.photoInfoSource.asObservable();

  constructor() { }

  setPhotoInfo(x: Image) {
    this.photoInfoSource.next(x);
  }
}
