import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ProfileIndicatorComponent } from './components/profile-indicator/profile-indicator.component';
import { environment } from 'src/environments/environment';
import { HomeFeedComponent } from './components/home-feed/home-feed.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SingleImageComponent } from './components/single-image/single-image.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfilePageComponent,
    LoginPageComponent,
    ProfileIndicatorComponent,
    HomeFeedComponent,
    MainPageComponent,
    SingleImageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule
  ],
  exports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
