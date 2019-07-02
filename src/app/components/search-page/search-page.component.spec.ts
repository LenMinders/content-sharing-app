import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPageComponent } from './search-page.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {environment} from '../../../environments/environment';
import {HttpClientModule} from '@angular/common/http';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        HttpClientModule
      ],
      declarations: [ SearchPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
