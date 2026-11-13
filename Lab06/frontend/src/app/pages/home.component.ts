import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <h1>Tableau de bord</h1>
    <p>Bienvenue dans TeamFlow. Utilisez les liens pour gérer les projets et les tâches.</p>
    <div class="grid">
      <div class="card"><h3>Projets</h3><p class="muted">Gérer les projets de votre équipe</p></div>
      <div class="card"><h3>Tâches</h3><p class="muted">Suivre leur progression</p></div>
    </div>
  `
})
export class HomeComponent {}