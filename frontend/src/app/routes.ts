import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user-component/user-component.component';
import { ReviewComponent } from './review/review.component';
import { ReviewFormComponent } from './review/review-form/review-form.component';
import { UserRegisterComponent } from './user-register/user-register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'reviews', component: ReviewComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/register', component: UserRegisterComponent },
  { path: 'review/new', component: ReviewFormComponent },
  { path: '', redirectTo: '/reviews', pathMatch: 'full' },
];
