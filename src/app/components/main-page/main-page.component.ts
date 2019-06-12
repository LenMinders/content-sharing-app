import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { faPlusSquare, faUser, faHome } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  faPlusSquare = faPlusSquare;
  faSearch = faSearch;
  faUser = faUser;
  faHome = faHome;
  isSearchCollapsed = true;
  isAtHomePage = false;
  isAtProfilePage = false;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private eventsService: EventsService) {

      router.events.subscribe((event: RouterEvent) => {
        if (event instanceof NavigationEnd) {
          this.isAtHomePage = router.url === '/home';
          this.isAtProfilePage = router.url === '/';
          // TODO possibly also set website tile here
        }
      });

    }

  ngOnInit() {
    this.firebaseAuth.auth.onAuthStateChanged(user => {
      if (!user) {
        this.router.navigateByUrl('/login');
      }
    });

    this.eventsService.currentPhotosToDelete.subscribe(x => {
      this.deletePhotos(x);
    });
  }

  deletePhotos(photoIds: string[]) {
    photoIds.forEach(photoId => {
      console.log('deleting photo: ' + photoId);
    });
  }

}
