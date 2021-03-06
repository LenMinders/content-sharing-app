import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-feed',
  templateUrl: './home-feed.component.html',
  styleUrls: ['./home-feed.component.scss']
})
export class HomeFeedComponent implements OnInit {
  result: object;
  getHomeFeedCloudFunctionSubscription;

  faUserCircle = faUserCircle;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getHomeFeedCloudFunctionSubscription = this.http.get(`https://us-central1-group-project-5ab0b.cloudfunctions.net/homeFeedData`)
      .subscribe((results) => {
        this.result = JSON.parse(results.toString());
      });
  }

  ngDestory() {
    this.getHomeFeedCloudFunctionSubscription.unsubscribe();
  }
}
