import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { Festivo } from '../../shared/entidades/festivo';

@Injectable({
  providedIn: 'root'
})
export class FestivosService {

  private url: string;


  constructor(private http: HttpClient) {
    this.url = `${environment.urlService}`;
  }

  public listar(): Observable<Festivo[]> {
    return this.http.get<Festivo[]>(`${this.url}listar`)
  }

  public buscar(opcion: number, dato: string): Observable<Festivo[]> {
    return this.http.get<Festivo[]>(`${this.url}buscar/${opcion}/${dato}`);
  }

  public agregar(Festivo: Festivo): Observable<Festivo> {
    return this.http.post<Festivo>(`${this.url}agregar`, Festivo);
  }

  public modificar(Festivo: Festivo): Observable<Festivo> {
    return this.http.put<Festivo>(`${this.url}modificar`, Festivo);
  }

  public getFestivosPorAnio(anio: number): Observable<Festivo[]> {
    return this.http.get<Festivo[]>(`${this.url}festivos-por-anio/${anio}`);
  }

  public validar(datetime: Date): Observable<boolean> {
    const year = datetime.getFullYear();
    const month = datetime.getMonth() + 1;
    const day = datetime.getDate();

    const fullUrl = `${this.url}es-festivo/${year}/${month}/${day}`;
    console.log('URL de la petición:', fullUrl);

    return this.http.get<boolean>(fullUrl).pipe(
      map(response => {
        console.log('Respuesta del servidor:', response);
        return response;
      })
    );
  }


}
