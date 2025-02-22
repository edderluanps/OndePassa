import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboadComponent } from './dashboad/dashboad.component';
import { EventsComponent } from './events/events.component';
import { FormEventComponent } from './events/form-event/form-event.component';
import { ReadEventComponent } from './events/read-event/read-event.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    {path: "", component: DashboadComponent},
    {path: "login", component: LoginComponent},
    {path: "signup", component: SignupComponent},
    {path: "dashboard", component: DashboadComponent},
    {path: "events", component: EventsComponent},
    {path: "event-page", component: ReadEventComponent},
    {path: "form-event", component: FormEventComponent}
];
