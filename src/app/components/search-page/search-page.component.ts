import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { faHeart, faComment, faUserCircle } from '@fortawesome/free-solid-svg-icons';

import { Search } from 'src/app/models/search';
import { SearchService } from 'src/app/services/search.service';
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  values: string;

  faHeart = faHeart;
  faComment = faComment;
  faUserCircle = faUserCircle;

  result: object;

  model: string;
  modelChanged: Subject<string> = new Subject<string>();

  search: Search[];

  constructor(
    public db: AngularFireDatabase, private searchService: SearchService
  ) { }

  ngOnInit() {
    this.modelChanged.pipe(
      debounceTime(100),
      distinctUntilChanged())
      .subscribe(value => {
        this.searchService.getSearchFeed(value)
          .subscribe(x => { this.search = x; });

      });
  }

  onKey(value: string) {
    this.modelChanged.next(value);
  }
}

