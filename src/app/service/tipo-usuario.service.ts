import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { TipoUsuarioInterface, TipoUsuarioNewInterface, TipoUsuarioResponse } from '../model/TipoUsuario-interface';

@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioService {

  entityURL: string = "/tipousuario";
  url : string = `${environment.baseURL}${this.entityURL}`;

  constructor(
    private httpClient: HttpClient
  ) { }

  getUsersTypePlist(page: number, size: number): Observable<TipoUsuarioResponse>{
    let params = new HttpParams()
    .set("page", page)
    .set("size", size);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json; charset=UTF-8'
      }),
      withCredentials: true,
      params: params
    };

    return this.httpClient.get<TipoUsuarioResponse>(this.url, httpOptions);
  }

  getTipoUsuario(id: number): Observable<TipoUsuarioInterface> {
    return this.httpClient.get<TipoUsuarioInterface>(this.url + "/" + id, {withCredentials:true});
  }

  createTipoUsuario(tipoUsuario: TipoUsuarioNewInterface): Observable<number> {
    return this.httpClient.post<number>(this.url+'/', tipoUsuario, {withCredentials:true});
  }

  updateTipoUsuario(tipoUsuario: TipoUsuarioInterface):Observable<number> {
    return this.httpClient.put<number>(this.url, tipoUsuario, {withCredentials:true});
  }

  deleteTipoUsuario(id: number): Observable<number> {
    return this.httpClient.delete<number>(this.url+'/'+id, {withCredentials:true});
  }
}
