import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './components/login-page/login-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { HomeFeedComponent } from './components/home-feed/home-feed.component';
import { SingleImageComponent } from './components/single-image/single-image.component';

const routes: Routes = [{
  path: '',
  component: MainPageComponent,
  children: [
    {
      path: '',
      component: ProfilePageComponent
    },
    {
      path: 'home',
      component: HomeFeedComponent
    },
    {
      path: 'image',
      component: SingleImageComponent
    }
  ]
}, {
  path: 'login',
  component: LoginPageComponent
}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
