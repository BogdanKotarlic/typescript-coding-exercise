import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  template: `
    <form (ngSubmit)="onSubmit()">
      <label>
        <div>Username</div>
        <input type="text" required [(ngModel)]="username" name="username" />
      </label>
      <label>
        <div>Password</div>
        <input
          type="password"
          required
          [(ngModel)]="password"
          name="password"
        />
      </label>
      <button type="submit">Login</button>
    </form>
  `,
  standalone: true,
  imports: [FormsModule],
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private router: Router) {}

  onSubmit() {
    // Simulate login
    localStorage.setItem('token', 'valid-token');
    this.router.navigate(['/']);
  }
}
