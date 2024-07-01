import { Routes } from '@angular/router';
import { ChatComponent } from './chat.component';
import { LoginComponent } from './login.component';

export const routes: Routes = [
  { path: '', component: ChatComponent },
  { path: 'login', component: LoginComponent }
];
