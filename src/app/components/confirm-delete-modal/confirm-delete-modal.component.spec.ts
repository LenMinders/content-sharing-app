import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmDeleteModalComponent} from './confirm-delete-modal.component';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

describe('ConfirmDeleteModalComponent', () => {

  let component: ConfirmDeleteModalComponent;
  let fixture: ComponentFixture<ConfirmDeleteModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgbModal, NgbActiveModal],
      declarations: [ConfirmDeleteModalComponent]
    });
    fixture = TestBed.createComponent(ConfirmDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
