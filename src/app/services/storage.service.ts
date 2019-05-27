import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  user: User;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.firebaseAuth.user.subscribe(
      user => this.user = user
    );
  }

  uploadFile(file: File) {
    const storageRef = firebase.storage().ref();

    storageRef.child(this.user.email).child(file.name).put(file)
      .then(snapshot => {
        console.log('Uploaded a file!');
      });
  }
}
