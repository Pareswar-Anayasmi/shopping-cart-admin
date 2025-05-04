import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingBag, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  template: `
    <div class="container">
      <div class="card">
        <a class="flex items-center gap-x-3 text-xl btn btn-ghost group mb-4">
          <fa-icon class="group-hover:text-primary" [icon]="faShoppingBag"></fa-icon>
          <span>Shopzo</span>
        </a>

        <form [formGroup]="loginForm" (ngSubmit)="onLogin()">
          <div class="form-group">
            <label for="userId">User ID</label>
            <input id="userId" formControlName="userId" type="text" placeholder="Enter user ID" />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              [type]="showPassword ? 'text' : 'password'"
              formControlName="password"
              placeholder="Enter password"
            />
            <fa-icon
              class="eye-icon"
              [icon]="showPassword ? faEyeSlash : faEye"
              (click)="togglePasswordVisibility()"
            ></fa-icon>
          </div>

          <div class="button-group">
            <button type="submit">Login</button>
            <button type="button" >Forgot Password</button>
          </div>

          <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background-color: #121212;
      color: #ffffff;
      height: 100vh;
      font-family: Arial, sans-serif;
    }

    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      padding: 16px;
    }

    .card {
      width: 100%;
      max-width: 400px;
      background: #1e1e1e;
      padding: 24px;
      border-radius: 10px;
      box-shadow: 0 0 12px rgba(0,0,0,0.7);
    }

    .form-group {
      margin-bottom: 16px;
      position: relative;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
    }

    input {
      width: 100%;
      padding: 10px;
      font-size: 14px;
      border: 1px solid #444;
      border-radius: 4px;
      background-color: #2a2a2a;
      color: #fff;
    }

    .eye-icon {
      position: absolute;
      right: 12px;
      top: 38px;
      cursor: pointer;
      color: #aaa;
    }

    .eye-icon:hover {
      color: #fff;
    }

    .button-group {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
    }

    button {
      flex: 1 1 48%;
      padding: 10px;
      font-size: 14px;
      border: none;
      border-radius: 4px;
      background-color:rgb(81, 155, 235);
      color: white;
      cursor: pointer;
    }

    button[type="button"] {
      background-color: #6c757d;
    }

    button:hover {
      opacity: 0.9;
    }

    .error {
      color: #ff5252;
      margin-top: 16px;
      text-align: center;
    }

    @media (max-width: 480px) {
      .button-group {
        flex-direction: column;
      }

      button {
        flex: 1 1 100%;
      }
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';
  showPassword = false;

  faShoppingBag = faShoppingBag;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    const { userId, password } = this.loginForm.value;
    if (userId === 'admin' && password === 'admin') {
      this.router.navigate(['/orders']);
    document.documentElement.setAttribute('data-theme', 'dark');

    } else {
      this.errorMessage = 'Wrong user ID or password!';
    }
  }

  onForgotPassword(): void {
    alert('Forgot Password clicked!');
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
