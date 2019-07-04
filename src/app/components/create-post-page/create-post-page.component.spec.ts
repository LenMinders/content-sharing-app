import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {APP_BASE_HREF, Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

import {CreatePostPageComponent} from './create-post-page.component';

import {FormsModule} from '@angular/forms';

import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {environment} from '../../../environments/environment';
import {ToastrModule} from 'ngx-toastr';
import {User} from '../../models/user';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


describe('CreatePostPageComponent', () => {
  let component: CreatePostPageComponent;
  let fixture: ComponentFixture<CreatePostPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        FormsModule,
        BrowserAnimationsModule
      ],
      declarations: [CreatePostPageComponent],
      providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}, {
        provide: APP_BASE_HREF,
        useValue: '/my/app'
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should loadFile', () => {

    const event = new Event('TestEvent');
    Object.defineProperty(event, 'target', {writable: false, value: {files: [new Blob()]}});
    component.loadFile(event);

    // expect(component.loadFile).toHaveBeenCalled();
  });



  it('should call make post - success', (done) => {
    component.user = {displayName: 'test', email: 'test@test.com', photoURL: 'url', uid: '123'} as User;

    spyOn(component['storage'], 'uploadFile').and.returnValue(Promise.resolve());

    spyOn(component['toastr'], 'success').and.callFake(() => {
      expect(component['toastr'].success).toHaveBeenCalled();
      done();
    });

    component.makePost();
    expect(component['storage'].uploadFile).toHaveBeenCalled();
  });

  it('should call make post - firebase update fail', (done) => {
    component.user = {displayName: 'test', email: 'test@test.com', photoURL: 'url', uid: '123'} as User;

    spyOn(component['storage'], 'uploadFile').and.returnValue(Promise.resolve());

    // TODO: make ref dynamic or figure out how to spy on subsequent calls or how to override local vars
    spyOn(component['firebase'].database, 'ref').and.returnValue(Promise.reject('Reason'));

    spyOn(console, 'error').and.callFake(() => {
      expect(console.error).toHaveBeenCalled();
      done();
    });

    component.makePost();
  });

  it('should call make post - uploadFile fail', (done) => {
    component.user = {displayName: 'test', email: 'test@test.com', photoURL: 'url', uid: '123'} as User;

    spyOn(component['storage'], 'uploadFile').and.returnValue(Promise.reject('Reason'));

    spyOn(console, 'error').and.callFake(() => {
      expect(console.error).toHaveBeenCalled();
      done();
    });

    component.makePost();
  });

});
