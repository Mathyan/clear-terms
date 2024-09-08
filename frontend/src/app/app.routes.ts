import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user-component/user-component.component';
import { ReviewComponent } from './review/review.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '', component: ReviewComponent },
  { path: 'user', component: UserComponent },
];
