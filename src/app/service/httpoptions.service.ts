import { HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpoptionsService {

  constructor( private loginService: LoginService ) { }

  getHttpOptions() {
    let headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json; charset=UTF-8');
    headers_object.append('Content-Type', 'application/json; charset=UTF-8');
    headers_object.append("Authorization", "Bearer " +this.loginService.getToken());

    const httpOptions = {
      headers: headers_object
    };

    if (this.loginService.isSessionActive) {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=UTF-8'
        }),
        withCredentials: true,
        Authorization: 'Bearer ' + this.loginService.getToken()
      }
    } else {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=UTF-8'
        }),
        withCredentials: true
      }
    }
  }
}
