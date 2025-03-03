import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { FormEventComponent } from './events/form-event/form-event.component';
import { ReadEventComponent } from './events/read-event/read-event.component';
import { SignupComponent } from './signup/signup.component';
import { DataComponent } from './dashboard/data/data.component';
import { ListagemComponent } from './usuarios/listagem/listagem.component';
import { LeaguesComponent } from './leagues/leagues.component';
import { LeaguePageComponent } from './leagues/league-page/league-page.component';
import { FormLeagueComponent } from './leagues/form-league/form-league.component';
import { BroadcastComponent } from './broadcast/broadcast.component';
import { BroadcastPageComponent } from './broadcast/broadcast-page/broadcast-page.component';
import { FormBroadcastComponent } from './broadcast/form-broadcast/form-broadcast.component';

export const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "login", component: LoginComponent },
    { path: "signup", component: SignupComponent },
    {
      path: 'dashboard', component: DashboardComponent, children: [
        { path: "", component: DataComponent },
        { path: 'data', component: DataComponent },
        { path: 'listagem-usuarios', component: ListagemComponent },
        { path: "events", component: EventsComponent },
        { path: "event-page", component: ReadEventComponent },
        { path: "form-event", component: FormEventComponent },
        { path: "leagues", component: LeaguesComponent },
        { path: "league-page", component: LeaguePageComponent },
        { path: "form-league", component: FormLeagueComponent },
        { path: "broadcast", component: BroadcastComponent },
        { path: "broadcast-page", component: BroadcastPageComponent },
        { path: "form-broadcast", component: FormBroadcastComponent }
      ]
    }
];
