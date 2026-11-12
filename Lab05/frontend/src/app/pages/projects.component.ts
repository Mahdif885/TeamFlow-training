import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectApiService } from '../api/project-api.service';
import { Project } from '../models';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h1>Projets</h1>
    @if (error()) { <p class="error">{{ error() }}</p> }

    <div class="card">
      <h3>Nouveau projet</h3>
      <form [formGroup]="form" (ngSubmit)="create()">
        <label>Nom</label>
        <input formControlName="name" />
        @if (form.controls.name.invalid && form.controls.name.touched) {
          <p class="error">Le nom est obligatoire.</p>
        }
        <label>Description</label>
        <textarea formControlName="description"></textarea>
        <button type="submit" [disabled]="form.invalid">Créer le projet</button>
      </form>
    </div>

    <table>
      <tr><th>Id</th><th>Nom</th><th>Description</th></tr>
      @for (p of projects(); track p.id) {
        <tr><td>{{ p.id }}</td><td>{{ p.name }}</td><td>{{ p.description }}</td></tr>
      } @empty {
        <tr><td colspan="3" class="muted">Aucun projet.</td></tr>
      }
    </table>
  `
})
export class ProjectsComponent implements OnInit {
  private api = inject(ProjectApiService);

  projects = signal<Project[]>([]);
  error = signal('');

  form = inject(FormBuilder).nonNullable.group({
    name: ['', Validators.required],
    description: ['']
  });

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.api.list().subscribe({
      next: data => { this.projects.set(data); this.error.set(''); },
      error: () => this.error.set("Impossible de joindre l'API. Le backend est-il démarré ?")
    });
  }

  create(): void {
    if (this.form.invalid) return;
    const v = this.form.getRawValue();
    this.api.create({ name: v.name, description: v.description || null }).subscribe({
      next: () => { this.form.reset(); this.load(); },
      error: () => this.error.set('La création du projet a échoué.')
    });
  }
}