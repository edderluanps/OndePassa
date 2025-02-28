import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { FormEventComponent } from './events/form-event/form-event.component';
import { ReadEventComponent } from './events/read-event/read-event.component';
import { SignupComponent } from './signup/signup.component';
import { DataComponent } from './dashboard/data/data.component';

export const routes: Routes = [
    {path: "", component: DashboardComponent},
    {path: "login", component: LoginComponent},
    {path: "signup", component: SignupComponent},
    { 
        path: 'dashboard', component: DashboardComponent, children: [
          { path: 'data', component: DataComponent },
          { path: 'signup', component: SignupComponent },
          { path: 'login', component: LoginComponent }
        ]
      },
    {path: "events", component: EventsComponent},
    {path: "event-page", component: ReadEventComponent},
    {path: "form-event", component: FormEventComponent}
];
