import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface Session {
  token: string;
  username: string;
  roles: string[];
}

const STORAGE_KEY = 'teamflow.session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  readonly session = signal<Session | null>(this.restore());
  readonly isLoggedIn = computed(() => this.session() !== null);

  login(username: string, password: string): Observable<Session> {
    return this.http.post<Session>('http://localhost:8080/api/auth/login', { username, password }).pipe(
      tap(session => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        this.session.set(session);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.session.set(null);
  }

  token(): string | null {
    return this.session()?.token ?? null;
  }

  hasRole(role: string): boolean {
    return this.session()?.roles.includes(role) ?? false;
  }

  private restore(): Session | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  }
}