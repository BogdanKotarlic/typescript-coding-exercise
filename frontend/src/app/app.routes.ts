import { Routes } from '@angular/router';
import { ChatComponent } from './chat.component';
import { LoginComponent } from './login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatComponent },
];
