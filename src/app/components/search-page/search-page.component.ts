import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Image } from 'src/app/models/image';
import { faHeart, faComment, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';



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

  constructor(
    public db: AngularFireDatabase, private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get('https://us-central1-group-project-5ab0b.cloudfunctions.net/searchPosts?searchTerm=sunflower%20picture')
    .subscribe((results) => {
      this.result = results;
      console.log(results);
    });

  }

  onKey(value: string): Observable<Image[]> {
    return this.http
      .get<Image>(`https://us-central1-group-project-5ab0b.cloudfunctions.net/searchPosts?searchTerm='${value}')`)
      .pipe(map(x => (x as any).value));


  }
}


