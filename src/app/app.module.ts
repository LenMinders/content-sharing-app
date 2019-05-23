import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentPageComponent } from './components/content-page/content-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ProfileIndicatorComponent } from './components/profile-indicator/profile-indicator.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentPageComponent,
    LoginPageComponent,
    ProfileIndicatorComponent,
  ],
  imports: [
    BrowserModule,
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
