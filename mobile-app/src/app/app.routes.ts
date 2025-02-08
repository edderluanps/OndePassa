import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./home/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./home/dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'listagem-eventos',
    loadComponent: () => import('./home/listagem-eventos/listagem-eventos.page').then( m => m.ListagemEventosPage)
  },
  {
    path: 'evento',
    loadComponent: () => import('./home/listagem-eventos/evento/evento.page').then( m => m.EventoPage)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./home/perfil/perfil.page').then( m => m.PerfilPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./home/signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'calendario-eventos',
    loadComponent: () => import('./home/calendario-eventos/calendario-eventos.page').then( m => m.CalendarioEventosPage)
  }
];
