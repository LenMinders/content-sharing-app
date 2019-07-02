import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { Search } from 'src/app/models/search';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {


  result: object;

  getSearchFeedCloudFunctionSubscription;

  constructor(private http: HttpClient) { }

  getSearchFeed(value): Observable<Search[]> {

    return this.http
      .get<string>(`https://us-central1-group-project-5ab0b.cloudfunctions.net/searchPosts?searchTerm=${value.replace(' ', '%20')}`)
      .pipe(map(x => {
        const output = JSON.parse(x.toString());
        return output.map(searchjson => {
          const soutput: Search = {
            displayName: searchjson.displayName,
            timeDateCreated: searchjson.timeDateCreated,
            description: searchjson.description
          };
          return soutput;

        });
      }));
  }

}
