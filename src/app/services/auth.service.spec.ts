import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {environment} from '../../environments/environment';
import * as firebase from 'firebase';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireAuthModule,
      AngularFireStorageModule,
      AngularFireDatabaseModule
    ]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it('should call doGoogleLogin', () => {
    const service: AuthService = TestBed.get(AuthService);
    const mockAuthProvider = jasmine.createSpyObj('GoogleAuthProvider', ['setCustomParameters', 'addScope', 'get']);
    spyOn(firebase.auth, 'GoogleAuthProvider').and.returnValue(mockAuthProvider);
    spyOn(service['firebaseAuth'].auth, 'signInWithPopup').and.returnValue(Promise.resolve());

    service.doGoogleLogin();

    expect(service['firebaseAuth'].auth.signInWithPopup).toHaveBeenCalled();
  });
});
