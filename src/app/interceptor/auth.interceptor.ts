
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
      private loginService: LoginService,
      private oRouter: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log('intercepting request ...', req);
      let request = req;

      if (this.loginService.isSessionActive()) {
          request = req.clone({
              setHeaders: {
                  authorization: `Bearer ${ this.loginService.getToken() }`
                }
          });
          console.log('  session active! New req: ', request);
      } else {
          this.oRouter.navigateByUrl('login');
      }

      return next.handle(request);
  }
}
