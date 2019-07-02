import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {environment} from '../../../environments/environment';
import {ToastrModule} from 'ngx-toastr';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import {MainPageComponent} from './main-page.component';
import {ConfirmDeleteModalComponent} from '../confirm-delete-modal/confirm-delete-modal.component';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let mainComponent: MainPageComponent;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
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
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // modalService = TestBed.get(NgbModal);
    // modalRef = modalService.open(ConfirmDeleteModalComponent);
    // mainComponent = fixture.componentInstance;
    // spyOn(modalService, 'open').and.returnValue(modalRef);
    // spyOn(console, 'log').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('Modal Opened', () => {
  //   mainComponent.openConfirmModal();
  //   expect(modalService.open).toHaveBeenCalled();
  // });
});
