import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginPageComponent} from './login-page.component';

import {FormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {environment} from '../../../environments/environment';
import {ToastrModule} from 'ngx-toastr';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {User} from '../../models/user';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        RouterTestingModule,
        FormsModule,
      ],
      declarations: [LoginPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;

    // Sets the test bed to actually set a user when user is subscribed to
    spyOn(component['firebaseAuth'].user, 'subscribe').and.returnValue(
      of({displayName: 'test', email: 'test@test.com', photoURL: 'string', uid: 'string'} as User)
    );

    spyOn(component['zone'], 'run').and.callThrough();

    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login', (done) => {
    spyOn(component['authService'], 'doGoogleLogin').and.returnValue(Promise.resolve());
    spyOn(component['router'], 'navigate').and.callFake(() => {
      expect(component['router'].navigate).toHaveBeenCalled();
      done();
      // Further reading on "done()": https://jakemccrary.com/blog/2019/02/13/testing-asynchronous-javascript-with-jasmine/
    });

    component.googleSignIn();

    expect(component['authService'].doGoogleLogin).toHaveBeenCalled();
    expect(component['zone'].run).toHaveBeenCalled();

  });

  it('should catch login failure', (done) => {
    spyOn(component['authService'], 'doGoogleLogin').and.returnValue(Promise.reject('Reason'));
    // spyOn(console, 'error').and.callThrough();
    spyOn(console, 'error').and.callFake(() => {
      expect(console.error).toHaveBeenCalled();
      done();
    });

    component.googleSignIn();

    expect(component['authService'].doGoogleLogin).toHaveBeenCalled();
    // expect(console.error).toHaveBeenCalled();
  });
});
