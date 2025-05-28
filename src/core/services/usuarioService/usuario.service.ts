import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UsuarioResponseList } from '../../../shared/DTOS/usuarioResponseList';
import { Observable } from 'rxjs';
import { Usuario } from '../../../shared/entidades/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string;

  constructor(private http: HttpClient) { 
    this.url = `${environment.urlService}usuarios/`;
  }

  obtenerUsuarios(): Observable<UsuarioResponseList[]> {
    return this.http.get<UsuarioResponseList[]>(`${this.url}listar`);
  }

  obtenerUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}obtener-por-id/${id}`);
  }

  agregarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}crear-usuario`, usuario);
  }

  modificarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.url}modificar`, usuario);
  }

  eliminarUsuario(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}eliminar/${id}`);
  }
}
