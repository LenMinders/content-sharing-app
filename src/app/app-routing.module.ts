import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentPageComponent } from './components/content-page/content-page.component';
// import { LoginPageComponent } from './components/login-page/login-page.component';


const routes: Routes = [{
  path: '',
  component: ContentPageComponent
}, {
  path: 'login',
  // component: LoginPageComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
