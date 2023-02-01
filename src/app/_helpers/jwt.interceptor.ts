import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpInterceptorFn
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';

import { environment } from '../../environments/environment';

// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {
//
//   constructor(private authenticationService: AuthenticationService) { }
//
//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     // add auth header with jwt if user is logged in and request is to the api url
//     const user = this.authenticationService.userValue;
//     const isLoggedIn = user?.jwt;
//     const isApiUrl = request.url.startsWith(environment.apiUrl);
//     if (isLoggedIn && isApiUrl) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${user.jwt}`
//         }
//       })
//     }
//
//     return next.handle(request);
//   }
// }
export const JwtInterceptor: HttpInterceptorFn = (request, next): Observable<HttpEvent<unknown>> => {
  const authenticationService = inject(AuthenticationService);
  //add auth header with jwt if user is logged in and request is to the api url
  const user = authenticationService.userValue;
  const isLoggedIn = user?.jwt;
  const isApiUrl = request.url.startsWith(environment.apiUrl);
  if (isLoggedIn && isApiUrl) {
    console.log("new interceptor 15")
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${user.jwt}`
      }
    })
  }
  return next(request)
}
