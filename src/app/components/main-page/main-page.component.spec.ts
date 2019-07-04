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

    // Sets the test bed to actually set a user when onAuthStateChanged is subscribed to
    spyOn(component['firebaseAuth'].auth, 'onAuthStateChanged').and.returnValue(of({displayName: 'test', email: 'test@test.com', photoURL: 'string', uid: 'string'} as User));

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

  it('modal opened', () => {
    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(ConfirmDeleteModalComponent);
    spyOn(modalService, 'open').and.returnValue(modalRef);
    spyOn(console, 'log').and.callThrough();

    component.openConfirmModal();
    expect(modalService.open).toHaveBeenCalled();
  });

  it('open confirm modal called', () => {
    spyOn(component, 'openConfirmModal');
    component.openConfirmModal();
    expect(component.openConfirmModal).toHaveBeenCalled();
  });

  it('cancel called', () => {
    spyOn(component, 'onCancel');
    component.onCancel();
    expect(component.onCancel).toHaveBeenCalled();
  });

  // afterEach(() => {
  //   component.routerEventsSubscription = new Subscription();
  // });

});
