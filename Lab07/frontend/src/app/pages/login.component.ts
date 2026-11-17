import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h1>Connexion à TeamFlow</h1>
    <div class="card">
      <h3>Identifiez-vous</h3>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <label>Utilisateur</label>
        <input formControlName="username" autocomplete="username" />
        <label>Mot de passe</label>
        <input type="password" formControlName="password" autocomplete="current-password" />
        @if (error()) { <p class="error">{{ error() }}</p> }
        <button type="submit" [disabled]="form.invalid">Se connecter</button>
      </form>
    </div>
  `
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  error = signal('');

  form = inject(FormBuilder).nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  submit(): void {
    if (this.form.invalid) return;
    const { username, password } = this.form.getRawValue();
    this.auth.login(username, password).subscribe({
      next: () => this.router.navigateByUrl('/projects'),
      error: err => this.error.set(
        err.status === 401 ? 'Identifiant ou mot de passe incorrect.' : "Impossible de joindre l'API."
      )
    });
  }
}