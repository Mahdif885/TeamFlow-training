import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

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
        </nav>
      </div>
    </header>
    <main class="wrap">
      <router-outlet />
    </main>
  `
})
export class AppComponent {}