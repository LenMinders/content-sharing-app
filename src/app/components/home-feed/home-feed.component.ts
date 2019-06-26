import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-feed',
  templateUrl: './home-feed.component.html',
  styleUrls: ['./home-feed.component.scss']
})
export class HomeFeedComponent implements OnInit {
  result: object;

  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.http.get(`https://us-central1-group-project-5ab0b.cloudfunctions.net/homeFeedData`)
      .subscribe((results) => {
        this.result = JSON.parse(results.toString());
      });
  }
}
