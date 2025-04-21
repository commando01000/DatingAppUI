import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/blank-layout/blank-layout/blank-layout.component').then(
        (m) => m.BlankLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (m) => m.HomeComponent
          ),
        title: 'Home',
      },
    ],
  },

  // {
  //   path: '',
  //   loadComponent: () =>
  //     import('./layouts/auth-layout/auth-layout/auth-layout.component').then(
  //       (m) => m.AuthLayoutComponent
  //     ),
  //   children: [
  //     { path: '', redirectTo: 'login', pathMatch: 'full' },
  //     {
  //       path: 'login',
  //       loadComponent: () =>
  //         import('./components/login/login.component').then(
  //           (m) => m.LoginComponent
  //         ),
  //       title: 'Login',
  //     },
  //     {
  //       path: 'register',
  //       loadComponent: () =>
  //         import('./components/register/register.component').then(
  //           (m) => m.RegisterComponent
  //         ),
  //       title: 'Register',
  //     },
  //     {
  //       path: 'not-found',
  //       loadComponent: () =>
  //         import('./components/notfound/notfound.component').then(
  //           (m) => m.NotfoundComponent
  //         ),
  //       title: 'Not Found',
  //     },
  //   ],
  // },
];
