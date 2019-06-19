import { TestBed } from '@angular/core/testing';

import { ModalInfoService } from './modal-info.service';

describe('ModalInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalInfoService = TestBed.get(ModalInfoService);
    expect(service).toBeTruthy();
  });
});
