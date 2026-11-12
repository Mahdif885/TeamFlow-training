import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectApiService } from '../api/project-api.service';
import { TaskApiService } from '../api/task-api.service';
import { Project, Task, TaskPriority } from '../models';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h1>Tâches</h1>
    @if (error()) { <p class="error">{{ error() }}</p> }

    <div class="card">
      <h3>Nouvelle tâche</h3>
      <form [formGroup]="form" (ngSubmit)="create()">
        <label>Projet</label>
        <select formControlName="projectId">
          @for (p of projects(); track p.id) {
            <option [ngValue]="p.id">{{ p.name }}</option>
          }
        </select>

        <label>Titre</label>
        <input formControlName="title" />
        @if (form.controls.title.invalid && form.controls.title.touched) {
          <p class="error">Le titre est obligatoire.</p>
        }

        <label>Priorité</label>
        <select formControlName="priority">
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>

        <label>Responsable</label>
        <input formControlName="assignee" />

        <label>Échéance</label>
        <input type="date" formControlName="dueDate" />

        <button type="submit" [disabled]="form.invalid">Créer la tâche</button>
      </form>
    </div>

    <table>
      <tr><th>Titre</th><th>Projet</th><th>Priorité</th><th>Responsable</th><th>Échéance</th><th>Statut</th></tr>
      @for (t of tasks(); track t.id) {
        <tr>
          <td>{{ t.title }}</td>
          <td>{{ projectName(t.projectId) }}</td>
          <td>{{ t.priority }}</td>
          <td>{{ t.assignee }}</td>
          <td>{{ t.dueDate }}</td>
          <td>{{ t.status }}</td>
          <td><button (click)="complete(t)" [disabled]="t.status === 'DONE'">Terminer</button></td>
        </tr>
      } @empty {
        <tr><td colspan="7" class="muted">Aucune tâche.</td></tr>
      }
    </table>
  `
})
export class TasksComponent implements OnInit {
  private taskApi = inject(TaskApiService);
  private projectApi = inject(ProjectApiService);

  tasks = signal<Task[]>([]);
  projects = signal<Project[]>([]);
  error = signal('');

  form = inject(FormBuilder).nonNullable.group({
    projectId: [null as number | null, Validators.required],
    title: ['', Validators.required],
    priority: ['MEDIUM' as TaskPriority, Validators.required],
    assignee: [''],
    dueDate: ['']
  });

  ngOnInit(): void {
    this.projectApi.list().subscribe({
      next: data => {
        this.projects.set(data);
        if (data.length && this.form.controls.projectId.value === null) {
          this.form.controls.projectId.setValue(data[0].id);
        }
      },
      error: () => this.error.set("Impossible de joindre l'API. Le backend est-il démarré ?")
    });
    this.load();
  }

  load(): void {
    this.taskApi.list().subscribe({
      next: data => { this.tasks.set(data); this.error.set(''); },
      error: () => this.error.set("Impossible de joindre l'API. Le backend est-il démarré ?")
    });
  }

  create(): void {
    if (this.form.invalid) return;
    const v = this.form.getRawValue();
    this.taskApi.create({
      title: v.title,
      status: 'TODO',                 
      priority: v.priority,
      assignee: v.assignee || null,
      dueDate: v.dueDate || null,     
      projectId: v.projectId!
    }).subscribe({
      next: () => { this.form.controls.title.reset(); this.load(); },
      error: () => this.error.set('La création de la tâche a échoué.')
    });
  }
  
    complete(task: Task): void {
    const { id, ...rest } = task;
    this.taskApi.update(id, { ...rest, status: 'DONE' }).subscribe({
      next: () => this.load(),
      error: () => this.error.set('La mise à jour de la tâche a échoué.')
    });
  }

    projectName(id: number): string {
    return this.projects().find(p => p.id === id)?.name ?? '';
  }
}