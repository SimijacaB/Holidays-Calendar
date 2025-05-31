import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UsuarioRequestLoginDTO } from '../../../shared/DTOS/UsuarioRequestLoginDTO';
import { UsuarioDTO } from '../../../shared/DTOS/UsuarioDTO';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlService}usuarios`;
  }

  login(nombreUsuario: string, clave: string): Observable<UsuarioDTO> {
    const request: UsuarioRequestLoginDTO = {
      nombreUsuario,
      clave
    };
    return this.http.post<UsuarioDTO>(`${this.url}/login`, request).pipe(
      tap((response: UsuarioDTO) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          const userInfo = {
            nombre: response.usuario.nombre,
            rol: response.usuario.rol
          };
          localStorage.setItem('usuario', JSON.stringify(userInfo));
        }
      })
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const usuario = localStorage.getItem('usuario');
    return token !== null && usuario !== null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }
}
