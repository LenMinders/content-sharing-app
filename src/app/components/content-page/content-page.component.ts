import { Component, OnInit } from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { User } from 'src/app/models/user';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.scss']
})
export class ContentPageComponent implements OnInit {
  // TODO: remove images form assets once media comes from online storage
  tempContent = [
    '../../../../assets/images/cat3.png',
    '../../../../assets/images/forrest-portrait.jpeg',
    '../../../../assets/images/space-large.jpg',
    '../../../../assets/images/bridge.jpg'
  ];

  faPlusSquare = faPlusSquare;
  faSearch = faSearch;
  user: User;

  constructor() { }

  ngOnInit() {
  }

}
