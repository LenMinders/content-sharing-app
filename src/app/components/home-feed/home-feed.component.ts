import { Component, OnInit } from '@angular/core';
import { faPlusSquare, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-feed',
  templateUrl: './home-feed.component.html',
  styleUrls: ['./home-feed.component.scss']
})
export class HomeFeedComponent implements OnInit {
  faPlusSquare = faPlusSquare;
  faSearch = faSearch;
  faHome = faHome;
  faUser = faUser;

  constructor() { }

  ngOnInit() {
  }

}
