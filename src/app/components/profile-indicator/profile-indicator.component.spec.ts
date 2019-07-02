import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileIndicatorComponent } from './profile-indicator.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {environment} from '../../../environments/environment';

describe('ProfileIndicatorComponent', () => {
  let component: ProfileIndicatorComponent;
  let fixture: ComponentFixture<ProfileIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireStorageModule,
        AngularFireDatabaseModule
      ],
      declarations: [ ProfileIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
