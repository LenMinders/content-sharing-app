import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private deletePhotosSource = new BehaviorSubject([]);
  private deleteModeSource = new BehaviorSubject(false);
  private selectedImageSource = new BehaviorSubject([]);
  currentPhotosToDelete = this.deletePhotosSource.asObservable();
  currentDeleteMode = this.deleteModeSource.asObservable();
  currentSelectedImage = this.selectedImageSource.asObservable();
  selectedImages: string[];

  constructor() {
    this.selectedImages = [];
  }

  deletePhotos() {
    this.deletePhotosSource.next(this.selectedImages);
  }

  setSelectedImages(value: string) {
    this.selectedImages.push(value);
    this.selectedImageSource.next(this.selectedImages);
  }

  getSelectedImages() {
    return this.selectedImages;
  }

  setDeleteMode(value: boolean) {
    this.deleteModeSource.next(value);
  }

  resetSelectedImages() {
    this.selectedImages = [];
    this.selectedImageSource.next(this.selectedImages);
  }

  removeSelectedImage(value: string) {
    this.selectedImages = this.selectedImages.filter((selectedImage) => {
      return selectedImage !== value;
    });
    this.selectedImageSource.next(this.selectedImages);
  }
}
