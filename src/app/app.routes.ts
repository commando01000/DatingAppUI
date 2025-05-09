import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout/auth-layout.component';
import { authGuard } from './guards/auth.guard';
import { MemberEditComponent } from './components/members/member-edit/member-edit.component';

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
      {
        path: 'members',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./components/members/member-list/member-list.component').then(
            (m) => m.MemberListComponent
          ),
        title: 'Members',
      },
      {
        path: 'members/:id',
        canActivate: [authGuard],
        loadComponent: () =>
          import(
            './components/members/member-details/member-details.component'
          ).then((m) => m.MemberDetailsComponent),
      },
      {
        path: 'members/:id/edit',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./components/members/member-edit/member-edit.component').then(
            (m) => m.MemberEditComponent
          ),
      },
      {
        path: 'messages',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./components/messages/messages.component').then(
            (m) => m.MessagesComponent
          ),
        title: 'Messages',
      },
      {
        path: 'lists',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./components/lists/lists.component').then(
            (m) => m.ListsComponent
          ),
        title: 'Lists',
      },
      {
        path: '**',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (m) => m.HomeComponent
          ),
        pathMatch: 'full',
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
