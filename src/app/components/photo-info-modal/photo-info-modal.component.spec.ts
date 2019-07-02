import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PhotoInfoModalComponent} from './photo-info-modal.component';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

describe('PhotoInfoModalComponent', () => {

  let component: PhotoInfoModalComponent;
  let fixture: ComponentFixture<PhotoInfoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgbModal, NgbActiveModal],
      declarations: [PhotoInfoModalComponent]
    });
    fixture = TestBed.createComponent(PhotoInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an undefined image', () => {
    expect(component.image).toBe(undefined);
  });

});
