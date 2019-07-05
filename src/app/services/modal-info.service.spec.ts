import { TestBed } from '@angular/core/testing';

import { ModalInfoService } from './modal-info.service';
import { Image } from '../models/image';

describe('ModalInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalInfoService = TestBed.get(ModalInfoService);
    expect(service).toBeTruthy();
  });

  it('should call setPhotoInfo', () => {
    const service: ModalInfoService = TestBed.get(ModalInfoService);
    spyOn(service['photoInfoSource'], 'next');

    const testImage = {
      id: 'test',
      imageName: 'test',
      imageUrl: 'test',
      contentType: 'test',
      fileSize: 'test',
      description: 'test'
    } as Image;

    service.setPhotoInfo(testImage);
    expect(service['photoInfoSource'].next).toHaveBeenCalledWith(testImage);
  });

});
