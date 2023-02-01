import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
  // { path: '', component: HomeComponent, redirectTo: 'login', canActivate: [AuthGuard] },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./components/sign-in/sign-in.component').then(
        (z) => z.SignInComponent
      )
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then(
        (m) => m.HomeComponent
      ),
    canActivate: [AuthGuard]
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
