import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SingleImageComponent} from './single-image.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {environment} from '../../../environments/environment';
import {RouterTestingModule} from '@angular/router/testing';
import {of, Subscription} from 'rxjs';
import {User} from '../../models/user';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SingleImageComponent', () => {
  let component: SingleImageComponent;
  let fixture: ComponentFixture<SingleImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [SingleImageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleImageComponent);
    component = fixture.componentInstance;

    // Sets the test bed to actually set a user when user is subscribed to
    spyOn(component['firebaseAuth'].user, 'subscribe').and.returnValue(of({displayName: 'test', email: 'test@test.com', photoURL: 'string', uid: 'string'} as User));

    component.user = {displayName: 'test', email: 'test@test.com', photoURL: 'url', uid: '123'} as User;

    // component.firebaseUserSubscription = new Subscription(); // SpyOn above breaks this as it no longer exists to unsubscribe from in cleanup

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterAll(() => {
    // Cleanup calls unsubscribe and as we defined the subscribe to be a spy, we need to give the ngOnDestroy something to unsubscribe to
    component.firebaseUserSubscription = new Subscription();
  });
});
