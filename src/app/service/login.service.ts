import { TokenInterface } from './../model/token-interface';
import { DecodeService } from './decode.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, filter, map } from 'rxjs';
import { environment } from 'src/environments/environment';

export enum Events {
  login,
  logout
}

export class EmitEvent {
  constructor( public event: Events, public token?: string ) {}
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private entityURL = '/login';
  url: string = `${environment.baseURL}${this.entityURL}`;
  subject= new Subject<EmitEvent>();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json; charset=UTF-8'
    }),
    withCredentials: true
  };

  constructor(
    private httpClient: HttpClient,
    private decodeService: DecodeService
  ) { }

  login( login: string, password: string ): Observable<string> {
    const loginData = JSON.stringify({ login: login, password: password });
    return this.httpClient.post<string>(this.url, loginData, this.httpOptions);
  }

  logout() {
    localStorage.removeItem("token");
  }

  on(event: Events): Observable<String> {
    return this.subject.pipe(
        filter((e: EmitEvent) => {
            return e.event === event;
        }),
        map((e: EmitEvent) => {
            return e.token;
        })
    )
  }

  emit(event: EmitEvent) {
    this.subject.next(event);
  }

  getUserName(): string {
    if (!this.isSessionActive()) {
        return "";
    } else {
        let token: string = localStorage.getItem("token");
        return this.decodeService.parseJwt(token).name;
    }
  }

  getToken(): string {
    return localStorage.getItem("token");
  }

  isSessionActive(): Boolean {
    let token: string = localStorage.getItem("token");
    if (token) {
        let oDecodedToken: TokenInterface = this.decodeService.parseJwt(token);
        if (Date.now() >= oDecodedToken.exp * 1000) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
  }
}
