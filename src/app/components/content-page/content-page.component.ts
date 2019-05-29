import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AngularFireAuth } from '@angular/fire/auth';
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
  isSearchCollapsed = true;

  constructor(private storage: StorageService, private router: Router, private firebaseAuth: AngularFireAuth) {

    const user = this.firebaseAuth.auth.currentUser;
    if (!user) {
      this.router.navigateByUrl('/login');
    }
  }

  uploadFile($event: any): void {
    this.storage.uploadFile($event.target.files[0]);
  }
}
