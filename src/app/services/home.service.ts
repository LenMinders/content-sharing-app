import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

import { HomeFeed } from 'src/app/models/home';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  result: object;
  getHomeFeedCloudFunctionSubscription;

  constructor(private http: HttpClient) { }

  getHomeFeed(): Observable<HomeFeed[]> {
    return this.getHomeFeedCloudFunctionSubscription =
      this.http.get<HomeFeed>(`https://us-central1-group-project-5ab0b.cloudfunctions.net/homeFeedData`)
        .pipe(map(x => (x as any).value));
  }
  
  ngDestory() {
    this.getHomeFeedCloudFunctionSubscription.unsubscribe();
  }
}

