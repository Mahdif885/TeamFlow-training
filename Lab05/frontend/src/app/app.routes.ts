import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { ProjectsComponent } from './pages/projects.component';
import { TasksComponent } from './pages/tasks.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'TeamFlow' },
  { path: 'projects', component: ProjectsComponent, title: 'TeamFlow - Projets' },
  { path: 'tasks', component: TasksComponent, title: 'TeamFlow - Tâches' },
  { path: '**', redirectTo: '' }
];