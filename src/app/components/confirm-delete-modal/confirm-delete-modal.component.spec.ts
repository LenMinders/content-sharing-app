import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ConfirmDeleteModalComponent} from './confirm-delete-modal.component';
import {NgbModal, NgbModalRef, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MainPageComponent} from "../main-page/main-page.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

describe('ConfirmDeleteModalComponent', () => {
  // let component: ConfirmDeleteModalComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let appComponent: MainPageComponent;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;

  beforeEach(async(() => {
    // TestBed.configureTestingModule({
    //   imports: [RouterTestingModule, NgbModule, FontAwesomeModule],
    //   declarations: [MainPageComponent, ConfirmDeleteModalComponent]
    // })
    TestBed.compileComponents();

    modalService = TestBed.get(NgbModal);
    modalRef = modalService.open(ConfirmDeleteModalComponent);
    fixture = TestBed.createComponent(MainPageComponent);
    appComponent = fixture.componentInstance;
    spyOn(modalService, 'open').and.returnValue(modalRef);
    spyOn(console, 'log').and.callThrough();
  }));

  it('Modal Opened', () => {
    appComponent.openConfirmModal();
    expect(modalService.open).toHaveBeenCalled();
  });

  // beforeEach(() => {
  //   // const modal = new NgbModule();
  //
  //   fixture = TestBed.createComponent(ConfirmDeleteModalComponent);
  //   component = fixture.componentInstance;
  //   // component.modal = modal;
  //   fixture.detectChanges();
  // });

  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     providers: [ NgbModal, NgbActiveModal ],
  //     declarations: [ ConfirmDeleteModalComponent ]
  //   });
  //   fixture = TestBed.createComponent(ConfirmDeleteModalComponent);
  //   component = fixture.componentInstance;
  //   component.modal = NgbModule
  //   fixture.detectChanges();
  // });
  //
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
