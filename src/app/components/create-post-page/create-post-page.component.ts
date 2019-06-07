import { Component } from '@angular/core';

@Component({
  selector: 'app-create-post-page',
  templateUrl: './create-post-page.component.html',
  styleUrls: ['./create-post-page.component.scss']
})
export class CreatePostPageComponent {
  photoSrc: any;
  // photoSrc = '../../../assets/images/forrest-portrait.jpeg';
  // photoSrc = '../../../assets/images/white-wall.jpg';

  constructor() { }

  loadFile($event: any): void {
    const file = $event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.photoSrc = reader.result;
    reader.readAsDataURL(file);
  }

}
