import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentPageComponent } from './components/content-page/content-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomeFeedComponent } from './components/home-feed/home-feed.component';

const routes: Routes = [{
  path: '',
  component: ContentPageComponent
}, {
  path: 'login',
  component: LoginPageComponent
}, {
  path: 'homefeed',
  component: HomeFeedComponent
}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
