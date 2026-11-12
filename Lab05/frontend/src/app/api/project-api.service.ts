import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models';

@Injectable({ providedIn: 'root' })
export class ProjectApiService {
  private http = inject(HttpClient);
  private url = 'http://localhost:8080/api/projects';

  list(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url);
  }

  create(project: Omit<Project, 'id'>): Observable<Project> {
    return this.http.post<Project>(this.url, project);
  }
}