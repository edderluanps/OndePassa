import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { FormEventComponent } from './events/form-event/form-event.component';
import { EventPageComponent } from './events/event-page/event-page.component';
import { SignupComponent } from './signup/signup.component';
import { DataComponent } from './dashboard/data/data.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { LeaguesComponent } from './leagues/leagues.component';
import { LeaguePageComponent } from './leagues/league-page/league-page.component';
import { FormLeagueComponent } from './leagues/form-league/form-league.component';
import { BroadcastComponent } from './broadcast/broadcast.component';
import { BroadcastPageComponent } from './broadcast/broadcast-page/broadcast-page.component';
import { FormBroadcastComponent } from './broadcast/form-broadcast/form-broadcast.component';
import { ListagemEventosHorariosComponent } from './dashboard/listagem-eventos-horarios/listagem-eventos-horarios.component';
import { UsuarioPageComponent } from './usuarios/usuario-page/usuario-page.component';
import { PerfilComponent } from './usuarios/perfil/perfil.component';

export const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "login", component: LoginComponent },
    { path: "signup", component: SignupComponent },
    {
      path: 'dashboard', component: DashboardComponent, children: [
        { path: "", component: DataComponent },
        { path: "listagem", component: ListagemEventosHorariosComponent },
        { path: 'data', component: DataComponent },
        { path: 'listagem-usuarios', component: UsuariosComponent },
        { path: 'usuario-page', component: UsuarioPageComponent },
        { path: 'perfil', component: PerfilComponent },
        { path: "events", component: EventsComponent },
        { path: "event-page/:id", component: EventPageComponent },
        { path: "form-event", component: FormEventComponent },
        { path: "form-event/:id", component: FormEventComponent },
        { path: "leagues", component: LeaguesComponent },
        { path: "league-page/:id", component: LeaguePageComponent },
        { path: "form-league", component: FormLeagueComponent },
        { path: "form-league/:id", component: FormLeagueComponent },
        { path: "broadcast", component: BroadcastComponent },
        { path: "broadcast-page/:id", component: BroadcastPageComponent },
        { path: "form-broadcast", component: FormBroadcastComponent },
        { path: "form-broadcast/:id", component: FormBroadcastComponent }
      ]
    }
];
