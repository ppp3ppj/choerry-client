import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpInterceptorFn
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';

// @Injectable()
// export class ErrorInterceptor implements HttpInterceptor {
//
//   constructor(private authenticationService: AuthenticationService) { }
//
//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     return next.handle(request).pipe(catchError(err => {
//       if ([401, 403].includes(err.status)) {
//         // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
//         //this.authenticationService.logout();
//         console.log(err.status);
//       }
//       console.log(err);
//       const error = err.error.message || err.statusText;
//       return throwError(error);
//     }));
//   }
// }
export const ErrorInterceptor: HttpInterceptorFn = (request, next): Observable<HttpEvent<unknown>> => {
  const authenticationService = inject(AuthenticationService);
  return next(request).pipe(catchError((err) => {
    if ([401, 403].includes(err.status)) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      //authenticationService.logout();
      console.log(err.status);
    }
    console.log(err);
    const error = err.error.message || err.statusText;
    return throwError(() => error);
  }))


}
