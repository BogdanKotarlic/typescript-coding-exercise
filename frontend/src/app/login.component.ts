import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  template: `
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        (ngSubmit)="onSubmit()"
        class="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h1 class="text-2xl font-bold text-center text-gray-800 mb-4">Login</h1>
        <label class="block mb-4">
          <span class="text-gray-700">Username</span>
          <input
            type="text"
            required
            [(ngModel)]="username"
            name="username"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label class="block mb-4">
          <span class="text-gray-700">Password</span>
          <input
            type="password"
            required
            [(ngModel)]="password"
            name="password"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <button
          type="submit"
          class="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md w-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </form>
    </div>
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
    this.router.navigate(['/chat']);
  }
}
