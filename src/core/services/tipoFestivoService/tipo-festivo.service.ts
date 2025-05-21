import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { TipoFestivo } from '../../../shared/entidades/festivo';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoFestivoService {
  private url: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    this.url = `${environment.urlService}tipo-festivo/`;
    console.log('URL Base del servicio:', this.url);
  }

  private handleError(error: any) {
    console.error('Error en el servicio:', error);
    return throwError(() => error);
  }

  public listar(): Observable<TipoFestivo[]> {
    const url = `${this.url}listar`;
    console.log('URL de listar:', url);
    return this.http.get<TipoFestivo[]>(url, this.httpOptions).pipe(
      tap(data => console.log('Respuesta de listar:', data)),
      catchError(this.handleError)
    );
  }

  public obtener(id: number): Observable<TipoFestivo> {
    const url = `${this.url}obtener/${id}`;
    console.log('URL de obtener:', url);
    return this.http.get<TipoFestivo>(url, this.httpOptions).pipe(
      tap(data => console.log('Respuesta de obtener:', data)),
      catchError(this.handleError)
    );
  }

  public agregar(tipoFestivo: TipoFestivo): Observable<TipoFestivo> {
    const url = `${this.url}agregar`;
    console.log('URL de agregar:', url);
    return this.http.post<TipoFestivo>(url, tipoFestivo, this.httpOptions).pipe(
      tap(data => console.log('Respuesta de agregar:', data)),
      catchError(this.handleError)
    );
  }

  public modificar(tipoFestivo: TipoFestivo): Observable<TipoFestivo> {
    const url = `${this.url}modificar`;
    console.log('URL de modificar:', url);
    return this.http.put<TipoFestivo>(url, tipoFestivo, this.httpOptions).pipe(
      tap(data => console.log('Respuesta de modificar:', data)),
      catchError(this.handleError)
    );
  }

  public eliminar(id: number): Observable<boolean> {
    const url = `${this.url}eliminar/${id}`;
    console.log('URL de eliminar:', url);
    return this.http.delete<boolean>(url, this.httpOptions).pipe(
      tap(data => console.log('Respuesta de eliminar:', data)),
      catchError(this.handleError)
    );
  }

  public buscar(tipo: number, dato: string): Observable<TipoFestivo[]> {
    const url = `${this.url}buscar/${tipo}/${encodeURIComponent(dato)}`;
    console.log('URL de buscar:', url);
    return this.http.get<TipoFestivo[]>(url, this.httpOptions).pipe(
      tap(data => console.log('Respuesta de buscar:', data)),
      catchError(this.handleError)
    );
  }
}
