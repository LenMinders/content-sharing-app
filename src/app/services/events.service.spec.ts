import { TestBed } from '@angular/core/testing';

import { EventsService } from './events.service';

describe('EventsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventsService = TestBed.get(EventsService);
    expect(service).toBeTruthy();
  });

  it('should call deletePhotos', () => {
    const service: EventsService = TestBed.get(EventsService);
    spyOn(service['deletePhotosSource'], 'next');

    service.deletePhotos();
    expect(service['deletePhotosSource'].next).toHaveBeenCalled();
  });

  it('should call setSelectedImages', () => {
    const service: EventsService = TestBed.get(EventsService);
    spyOn(service['selectedImageSource'], 'next');
    service.selectedImages = [];

    service.setSelectedImages('');
    expect(service['selectedImageSource'].next).toHaveBeenCalledWith(['']);
  });

  it('should call getSelectedImages', () => {
    const service: EventsService = TestBed.get(EventsService);
    service.selectedImages = [];
    expect(service.getSelectedImages()).toEqual([]);
  });

  it('should call setDeleteMode', () => {
    const service: EventsService = TestBed.get(EventsService);
    spyOn(service['deleteModeSource'], 'next');
    service.selectedImages = [];

    service.setDeleteMode(false);
    expect(service['deleteModeSource'].next).toHaveBeenCalledWith(false);
  });

  it('should call setIsDownloading', () => {
    const service: EventsService = TestBed.get(EventsService);
    spyOn(service['isDownloadingSource'], 'next');
    service.selectedImages = [];

    service.setIsDownloading(false);
    expect(service['isDownloadingSource'].next).toHaveBeenCalledWith(false);
  });

  it('should call resetSelectedImages', () => {
    const service: EventsService = TestBed.get(EventsService);
    spyOn(service['selectedImageSource'], 'next');
    service.selectedImages = [];

    service.resetSelectedImages();
    expect(service['selectedImageSource'].next).toHaveBeenCalledWith([]);
  });

  it('should call removeSelectedImage', () => {
    const service: EventsService = TestBed.get(EventsService);
    spyOn(service['selectedImageSource'], 'next');
    service.selectedImages = ['test', 'testRemains'];

    service.removeSelectedImage('test');
    expect(service['selectedImageSource'].next).toHaveBeenCalledWith(['testRemains']);
  });

  it('should call setIsDeleting', () => {
    const service: EventsService = TestBed.get(EventsService);
    spyOn(service['isDeletingSource'], 'next');

    service.setIsDeleting(false);
    expect(service['isDeletingSource'].next).toHaveBeenCalledWith(false);
  });

});
