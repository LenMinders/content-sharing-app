import { Component } from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.scss']
})
export class ContentPageComponent {
  // TODO: remove images form assets once media comes from online storage
  tempContent = [
    '../../../../assets/images/cat3.png',
    '../../../../assets/images/forrest-portrait.jpeg',
    '../../../../assets/images/space-large.jpg',
    '../../../../assets/images/bridge.jpg'
  ];

  faPlusSquare = faPlusSquare;
  faSearch = faSearch;

  constructor(private storage: StorageService) { }

  uploadFile($event: any): void {
    this.storage.uploadFile($event.target.files[0]);
  }

}
