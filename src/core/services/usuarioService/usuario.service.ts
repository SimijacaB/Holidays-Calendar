import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UsuarioRequestLoginDTO } from '../../../shared/DTOS/UsuarioRequestLoginDTO';
import { UsuarioResponseLoginDTO } from '../../../shared/DTOS/UsuarioResponseLoginDTO';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlService}usuarios/`;
  }
  public iniciarSesion(usuario: string, password: string): Observable<UsuarioResponseLoginDTO> {
    return this.http.get<UsuarioResponseLoginDTO>(`${this.url}login/${usuario}/${password}`);
  }
}
