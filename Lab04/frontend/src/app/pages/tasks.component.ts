import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <h1>Tâches</h1>
    <p class="muted">La liste des tâches sera chargée depuis l'API au prochain lab.</p>
  `
})
export class TasksComponent {}