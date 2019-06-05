import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { StorageService } from 'src/app/services/storage.service';
import { ToastrService } from 'ngx-toastr';

import { faPlusSquare, faUser, faHome } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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

  constructor(
    private firebaseAuth: AngularFireAuth,
    private storage: StorageService,
    private router: Router,
    private toastr: ToastrService) {

      router.events.subscribe((event: RouterEvent) => {
        if (event instanceof NavigationEnd) {
          this.isAtHomePage = router.url === '/home';
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
  }

  uploadFile($event: any): void {
    this.storage.uploadFile($event.target.files[0])
      .then(() => {
        this.toastr.success('upload complete', 'Success!', {
          closeButton: true,
          positionClass: 'toast-top-left'
        });
      });
  }

}
