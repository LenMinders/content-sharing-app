import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

import { Search } from 'src/app/models/search';
import { SearchService } from 'src/app/services/search.service';
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  faUserCircle = faUserCircle;

  model = '';
  modelChanged: Subject<string> = new Subject<string>();

  search: Search[] = [];

  constructor(
    public db: AngularFireDatabase,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.modelChanged.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(value => {
        this.searchService.getSearchFeed(value)
          .subscribe(x => {
            this.search = x;
          });
      });
  }

  onKey(value: string) {
    this.modelChanged.next(value);
  }
}

