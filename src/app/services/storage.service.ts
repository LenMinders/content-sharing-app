import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { User } from '../models/user';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  user: User;
  isUploadedSource: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private firebaseAuth: AngularFireAuth, private firebaseStorage: AngularFireStorage) {
    this.firebaseAuth.user.subscribe(
      user => this.user = user
    );
  }

  uploadFile(file: File) {
    const storageRef = this.firebaseStorage.storage.ref();

    storageRef.child(this.user.email)
      .child(Date.now() + '.' + file.name.split('.').pop())
      .put(file)
      .then(snapshot => {
        this.isUploadedSource.next(snapshot.state);
      });
  }
}
