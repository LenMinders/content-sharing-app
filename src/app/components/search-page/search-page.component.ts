import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { faHeart, faComment, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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

  constructor(
    public db: AngularFireDatabase, private http: HttpClient
  ) { }

  ngOnInit() {
    this.modelChanged.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(value => {
        this.http.get(`https://us-central1-group-project-5ab0b.cloudfunctions.net/searchPosts?searchTerm=${value.replace(' ', '%20')}`)
          .subscribe((results) => {
            this.result = results;
            console.log(results);
          });
      });
  }

  onKey(value: string) {
    this.modelChanged.next(value);
  }
}
