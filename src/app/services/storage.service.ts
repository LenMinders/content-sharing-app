import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  user: User;

  constructor(private firebaseAuth: AngularFireAuth, private firebaseStorage: AngularFireStorage) {
    this.firebaseAuth.user.subscribe(
      user => this.user = user
    );
  }

  uploadFile(file: File) {
    const storageRef = this.firebaseStorage.storage.ref();

    storageRef.child(this.user.email).child(file.name).put(file)
      .then(snapshot => {
        console.log('Uploaded a file!');
      });
  }
}
