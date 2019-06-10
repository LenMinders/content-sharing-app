import { Component, OnInit } from '@angular/core';

import { faHeart, faComment, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-image',
  templateUrl: './single-image.component.html',
  styleUrls: ['./single-image.component.scss']
})
export class SingleImageComponent implements OnInit {

  faHeart = faHeart;
  faComment = faComment;
  faUserCircle = faUserCircle;

  activatedRoute: any;

  imageUrl: string;
  displayPhoto: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.imageUrl = this.route.snapshot.queryParamMap.get('imageUrl');
    this.displayPhoto = this.imageUrl;
  }
}


