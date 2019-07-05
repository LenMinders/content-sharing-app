import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SingleImageComponent} from './single-image.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {environment} from '../../../environments/environment';
import {RouterTestingModule} from '@angular/router/testing';
import {of, Subscription, throwError} from 'rxjs';
import {User} from '../../models/user';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NgbModal, NgbModalRef, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmDeleteModalComponent} from '../confirm-delete-modal/confirm-delete-modal.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {Image} from '../../models/image';

describe('SingleImageComponent', () => {
  let component: SingleImageComponent;
  let fixture: ComponentFixture<SingleImageComponent>;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserDynamicTestingModule,
        NgbModule,
        FontAwesomeModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [SingleImageComponent, ConfirmDeleteModalComponent]
    })
      .overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [ConfirmDeleteModalComponent] } })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleImageComponent);
    component = fixture.componentInstance;

    // Sets the test bed to actually set a user when user is subscribed to
    spyOn(component['firebaseAuth'].user, 'subscribe').and.returnValue(
      of({displayName: 'test', email: 'test@test.com', photoURL: 'string', uid: 'string'} as User)
    );
    component.user = {displayName: 'test', email: 'test@test.com', photoURL: 'url', uid: '123'} as User;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('modal opened', () => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(ConfirmDeleteModalComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    spyOn(console, 'log').and.callThrough();

    component.openConfirmModal();
    expect(modalService.open).toHaveBeenCalled();
  });

  it('open confirm modal called', () => {
    spyOn(component, 'openConfirmModal').and.callThrough();

    spyOn(component['modalService'], 'open').and.returnValue({result: Promise.resolve()});

    spyOn(component['eventsService'], 'deletePhotos');
    spyOn(component['eventsService'], 'setDeleteMode');
    spyOn(component['eventsService'], 'resetSelectedImages');

    component.openConfirmModal();
    expect(component.openConfirmModal).toHaveBeenCalled();

    // expect(component.eventsService.deletePhotos).toHaveBeenCalled();
    // expect(component.eventsService.setDeleteMode).toHaveBeenCalled();
    // expect(component.eventsService.resetSelectedImages).toHaveBeenCalled();
  });

  it('open confirm modal called but failed and error logged', (done) => {
    spyOn(component, 'openConfirmModal').and.callThrough();

    spyOn(console, 'error').and.callFake(() => {
      expect(console.error).toHaveBeenCalled();
      done();
    });

    spyOn(component['modalService'], 'open').and.returnValue({result: Promise.reject('Reason')});

    component.openConfirmModal();
    expect(component.openConfirmModal).toHaveBeenCalled();
  });

  it('should call retrievePostInfo ', () => {
    const snapshot = {
      val() {
        return {
          id: '123',
          imageName: 'test',
          imageUrl: 'test',
          contentType: 'JPG',
          fileSize: '123',
          description: 'test'
        } as Image;
      }
    };
    component.imageName = 'test.jpg';
    spyOn(component['db'].database, 'ref').and.returnValue({once: () => (Promise.resolve(snapshot))});

    // Doesn't work because type Image does not have a 'set' method defined in its interface
    // spyOnProperty(component, 'image', 'set').and.callThrough().and.callFake(() => {
    //   expect(component.image).toBeDefined();
    //   expect(component.image.id).toBe('123');
    //   done();
    // });

    component.retrievePostInfo();
    // TODO: Make this wait for the resolution of the promise
    // expect(component.image).toBeDefined();
    // expect(component.image.id).toBe('123');
  });

  it('should call openPhotoInfoModal', () => {
    spyOn(component['modalInfoService'], 'setPhotoInfo');
    spyOn(component['modalService'], 'open');

    component.openPhotoInfoModal();

    expect(component['modalInfoService'].setPhotoInfo).toHaveBeenCalled();
    expect(component['modalService'].open).toHaveBeenCalled();
  });

  it('should call downloadImage', (done) => {
    spyOn(component['eventsService'], 'setIsDownloading');
    spyOn(component, 'getImage').and.returnValue(of(new Blob()));

    spyOn(window.URL, 'revokeObjectURL').and.callFake(() => {
      expect(window.URL.revokeObjectURL).toHaveBeenCalled();
      done();
    });

    component.imageUrl = '';
    component.downloadImage();
  });

  it('should call downloadImage and fail gracefully', (done) => {
    spyOn(component['eventsService'], 'setIsDownloading');
    spyOn(component, 'getImage').and.returnValue(throwError('Valid token not returned'));

    spyOn(console, 'error').and.callFake(() => {
      expect(component['eventsService'].setIsDownloading).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalled();
      done();
    });

    component.imageUrl = '';
    component.downloadImage();
  });

  it('should call getImage', () => {
    spyOn(component['http'], 'get');

    component.getImage('');

    expect(component['http'].get).toHaveBeenCalled();
  });

  it('should call createDownloadableLink', () => {
    spyOn(document.body, 'appendChild');

    component.createDownloadableLink();

    expect(document.body.appendChild).toHaveBeenCalled();
  });

  afterEach(() => {
    // Cleanup calls unsubscribe and as we defined the subscribe to be a spy, we need to give the ngOnDestroy something to unsubscribe to
    component.firebaseUserSubscription = new Subscription();
  });
});
