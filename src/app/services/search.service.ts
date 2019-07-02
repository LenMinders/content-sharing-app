import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Search } from 'src/app/models/search';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  getSearchFeed(value): Observable<Search[]> {

    return this.http
      .get<string>(`https://us-central1-group-project-5ab0b.cloudfunctions.net/searchPosts?searchTerm=${encodeURIComponent(value)}`)
      .pipe(map(x => {
        const output = JSON.parse(x.toString());
        return output.map(searchJSON => {
          const sOutput: Search = {
            displayName: searchJSON.displayName,
            timeDateCreated: searchJSON.timeDateCreated,
            description: searchJSON.description,
            imgURL: searchJSON.imageUrl,
            photoURL: searchJSON.photoURL
          };
          return sOutput;

          });
      }));
  }

}
