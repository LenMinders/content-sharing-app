import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {environment} from '../../../environments/environment';
import {ToastrModule} from 'ngx-toastr';
import {NgbModal, NgbModalRef, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {MainPageComponent} from './main-page.component';
import {ConfirmDeleteModalComponent} from '../confirm-delete-modal/confirm-delete-modal.component';
import {of, Subscription} from 'rxjs';
import { User } from 'src/app/models/user';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {NgbModalBackdrop} from '@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';
import {NavigationEnd, RouterEvent} from "@angular/router";

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserDynamicTestingModule,
        NgbModule,
        FontAwesomeModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireStorageModule,
        AngularFireDatabaseModule,
      ],
      declarations: [MainPageComponent, ConfirmDeleteModalComponent]
    })
      .overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [ConfirmDeleteModalComponent] } })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;

    // spyOn(component['router'].events, 'subscribe').and.returnValue(of(new NavigationEnd(2, '/', '/')));
    // spyOn(component['router'].events, 'subscribe').and.callFake((callback) => {
    //   return callback(of(new NavigationEnd(2, '/', '/')));
    // });

    // Sets the test bed to actually set a user when onAuthStateChanged is subscribed to
    spyOn(component['firebaseAuth'].auth, 'onAuthStateChanged').and.callFake((callback) => {
      return callback({displayName: 'test', email: 'test@test.com', photoURL: 'string', uid: 'string'} as User);
    });
    spyOn(component['firebaseAuth'].user, 'subscribe').and.returnValue(
      of({displayName: 'test', email: 'test@test.com', photoURL: 'string', uid: 'string'} as User)
    ).and.callThrough();

    // spyOn(component['router'], 'navigateByUrl').and.callFake(() => {
    //   expect(component['router'].navigateByUrl).toHaveBeenCalled();
    //   done();
    // });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const compile = fixture.debugElement.nativeElement;
    const h1tag = compile.querySelector('header');
    expect(h1tag.textContent).toBeTruthy();
    const routerOutlet = compile.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });

  it('should call deletePhotos', () => {
    component.user = {displayName: 'test', email: 'test@test.com', photoURL: 'string', uid: 'string'} as User;
    spyOn(component['firebaseStorage'].storage, 'ref').and.returnValue({child: () => ({delete: () => Promise.resolve()})});
    spyOn(component['toastr'], 'success');
    spyOn(component.eventsService, 'setIsDeleting');
    spyOn(component['router'], 'navigateByUrl');

    component.deletePhotos(['test1']);
  });

  it('should call deletePhotos and fail gracefully', (done) => {
    component.user = {displayName: 'test', email: 'test@test.com', photoURL: 'string', uid: 'string'} as User;
    spyOn(component['firebaseStorage'].storage, 'ref').and.returnValue({child: () => ({delete: () => Promise.reject('Reason')})});
    spyOn(component.eventsService, 'setIsDeleting');

    spyOn(console, 'error').and.callFake(() => {
      expect(console.error).toHaveBeenCalled();
      done();
    });

    component.deletePhotos(['test1']);
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

    spyOn(component.eventsService, 'deletePhotos');
    spyOn(component.eventsService, 'setDeleteMode');
    spyOn(component.eventsService, 'resetSelectedImages');

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

  it('cancel called', () => {
    spyOn(component.eventsService, 'setDeleteMode');
    spyOn(component.eventsService, 'resetSelectedImages');

    component.onCancel();
    expect(component.eventsService.setDeleteMode).toHaveBeenCalled();
    expect(component.eventsService.resetSelectedImages).toHaveBeenCalled();
  });

  afterEach(() => {
    // component.routerEventsSubscription = new Subscription();
    component.firebaseUserSubscription = new Subscription();
  });

  afterAll(() => {
    component.ngOnDestroy();
  });

});
