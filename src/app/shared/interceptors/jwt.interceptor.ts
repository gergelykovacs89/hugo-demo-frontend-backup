import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from '../../auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    const authorToken = JSON.parse(localStorage.getItem('authorToken'));
    if (currentUser && userToken) {
      request = request.clone({
        setHeaders: {
          'x-auth': `${userToken}`
        }
      });
    }
    return next.handle(request);
  }
}
