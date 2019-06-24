import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { User } from '../models/user';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  user: User;

  constructor(private firebaseAuth: AngularFireAuth,
              private firebaseStorage: AngularFireStorage) {
    this.firebaseAuth.user.subscribe(
      user => this.user = user
    );
  }

  uploadFile(file: File, fileId: string) {
    return this.firebaseStorage.storage
      .ref()
      .child(this.user.uid)
      .child(fileId + '.' + file.name.split('.').pop())
      .put(file);
  }
}
