import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, TaskPayload } from '../models';

@Injectable({ providedIn: 'root' })
export class TaskApiService {
  private http = inject(HttpClient);
  private url = 'http://localhost:8080/api/tasks';

  list(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
  }

  create(task: TaskPayload): Observable<Task> {
    return this.http.post<Task>(this.url, task);
  }

  update(id: number, task: TaskPayload): Observable<Task> {
    return this.http.put<Task>(`${this.url}/${id}`, task);
  }
}