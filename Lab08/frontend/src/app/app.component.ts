import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <header class="topbar">
      <div class="wrap">
        <span class="brand">TeamFlow</span>
        <nav>
          <a routerLink="/">Accueil</a>
          <a routerLink="/projects">Projets</a>
          <a routerLink="/tasks">Tâches</a>
          @if (auth.session(); as s) {
            <span>{{ s.username }}</span>
            <button (click)="logout()">Déconnexion</button>
          } @else {
            <a routerLink="/login">Connexion</a>
          }
        </nav>
      </div>
    </header>
    <main class="wrap">
      <router-outlet />
    </main>
  `
})
export class AppComponent {
  auth = inject(AuthService);
  private router = inject(Router);

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}