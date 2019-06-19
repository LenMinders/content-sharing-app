import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { faPlusSquare, faUser, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

import { EventsService } from 'src/app/services/events.service';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  faPlusSquare = faPlusSquare;
  faSearch = faSearch;
  faUser = faUser;
  faHome = faHome;

  isAtHomePage = false;
  isAtProfilePage = false;
  user: User;

  routerEventsSubscription: Subscription;
  firebaseUserSubscription: Subscription;
  deletePhotosSubscription: Subscription;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private eventsService: EventsService,
    private toastr: ToastrService,
    private firebaseStorage: AngularFireStorage) {

    this.routerEventsSubscription = router.events.subscribe((event: RouterEvent) => {
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

    this.firebaseUserSubscription = this.firebaseAuth.user.subscribe(
      user => this.user = user
    );

    this.deletePhotosSubscription = this.eventsService.currentPhotosToDelete.subscribe(x => {
      this.deletePhotos(x);
    });
  }

  ngOnDestroy() {
    this.routerEventsSubscription.unsubscribe();
    this.firebaseUserSubscription.unsubscribe();
    this.deletePhotosSubscription.unsubscribe();
  }

  deletePhotos(fileNames: string[]) {
    fileNames.forEach(fileName => {
      this.firebaseStorage.storage.ref().child(this.user.uid + '/' + fileName).delete()
        .then(() => {
          // File deleted successfully
          this.toastr.success('Post deleted', 'Success!', {
            closeButton: true,
            positionClass: 'toast-top-left'
          });

          this.router.navigateByUrl('/');
        }).catch((error) => {
          // TODO show that an error occured
          console.log('Error. File not deleted.');
        });
    });
  }

}
