import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private deletePhotosSource = new BehaviorSubject([]);
  currentPhotosToDelete = this.deletePhotosSource.asObservable();
  deleteMode = false;
  selectedImages: string[];

  constructor() {
    this.selectedImages = [];
  }

  deletePhotos() {
    this.deletePhotosSource.next(this.selectedImages);
  }

  setSelectedImages(value: string) {
    this.selectedImages.push(value);
  }

  getSelectedImages() {
    return this.selectedImages;
  }

  setDeleteMode(value: boolean) {
    this.deleteMode = value;
  }

  getDeteleMode() {
    return this.deleteMode;
  }

  resetSelectedImages() {
    this.selectedImages = [];
  }

  removeSelectedImage(value: string) {
    this.selectedImages = this.selectedImages.filter((selectedImage) => {
      return selectedImage !== value;
    });
  }
}
