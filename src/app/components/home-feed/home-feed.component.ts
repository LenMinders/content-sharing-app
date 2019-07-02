import { Component, OnInit } from '@angular/core';

import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { HomeService } from 'src/app/services/home.service';
import { HomeFeed } from 'src/app/models/home';

@Component({
  selector: 'app-home-feed',
  templateUrl: './home-feed.component.html',
  styleUrls: ['./home-feed.component.scss']
})
export class HomeFeedComponent implements OnInit {
  result: object;
  getHomeFeedCloudFunctionSubscription;

  faUserCircle = faUserCircle;
  home: HomeFeed[] = [];

  constructor(private homeFeedService: HomeService) { }

  ngOnInit() {
    this.homeFeedService.getHomeFeed()
      .subscribe(x => { this.home = x; });
  }
}
