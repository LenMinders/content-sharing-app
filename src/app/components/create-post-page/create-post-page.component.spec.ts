import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {APP_BASE_HREF, Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

import { CreatePostPageComponent } from './create-post-page.component';

import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {environment} from '../../../environments/environment';
import {ToastrModule} from 'ngx-toastr';


describe('CreatePostPageComponent', () => {
  let component: CreatePostPageComponent;
  let fixture: ComponentFixture<CreatePostPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        FormsModule
      ],
      declarations: [ CreatePostPageComponent ],
      providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy },{ provide: APP_BASE_HREF, useValue: '/my/app'}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
