import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  user: User;

  constructor(private firebaseAuth: AngularFireAuth,
              private firebaseStorage: AngularFireStorage,
              private toastr: ToastrService) {
    this.firebaseAuth.user.subscribe(
      user => this.user = user
    );
  }

  uploadFile(file: File) {
    return this.firebaseStorage.storage
      .ref()
      .child(this.user.uid)
      .child(Date.now() + '.' + file.name.split('.').pop())
      .put(file);
  }

  handleFileUpload(file: File) {
    this.uploadFile(file)
    .then(() => {
      this.displaySucccessToast();
    });
  }

  displaySucccessToast() {
    this.toastr.success('upload complete', 'Success!', {
      closeButton: true,
      positionClass: 'toast-top-left'
    });
  }
}
