import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private deletePhotosSource = new BehaviorSubject([]);
  currentPhotosToDelete = this.deletePhotosSource.asObservable();

  constructor() { }

  deletePhotos(x: string[]) {
    this.deletePhotosSource.next(x);
  }
}
