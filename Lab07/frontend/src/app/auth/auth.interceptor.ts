import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

const API_URL = 'http://localhost:8080/api';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token();

  const isApi = req.url.startsWith(API_URL);
  const isLogin = req.url.endsWith('/auth/login');

  if (!token || !isApi || isLogin) {
    return next(req);
  }
  return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};