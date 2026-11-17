import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { HomeComponent } from './pages/home.component';
import { LoginComponent } from './pages/login.component';
import { ProjectsComponent } from './pages/projects.component';
import { TasksComponent } from './pages/tasks.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'TeamFlow' },
  { path: 'login', component: LoginComponent, title: 'TeamFlow - Connexion' },
  { path: 'projects', component: ProjectsComponent, canActivate: [authGuard], title: 'TeamFlow - Projets' },
  { path: 'tasks', component: TasksComponent, canActivate: [authGuard], title: 'TeamFlow - Tâches' },
  { path: '**', redirectTo: '' }
];