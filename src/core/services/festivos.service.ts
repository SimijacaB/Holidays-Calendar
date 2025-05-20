import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Festivo, TipoFestivo } from '../../shared/entidades/festivo';

@Injectable({
  providedIn: 'root'
})
export class FestivosService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlService}`;
  }

  public listar(): Observable<Festivo[]> {
    return this.http.get<Festivo[]>(`${this.url}listar`);
  }

  public obtener(id: number): Observable<Festivo> {
    return this.http.get<Festivo>(`${this.url}obtener/${id}`);
  }

  public buscar(tipo: number, dato: string): Observable<Festivo[]> {
    return this.http.get<Festivo[]>(`${this.url}buscar/${tipo}/${dato}`);
  }

  public agregar(festivo: Festivo): Observable<Festivo> {
    return this.http.post<Festivo>(`${this.url}agregar`, festivo);
  }

  public modificar(festivo: Festivo): Observable<Festivo> {
    return this.http.put<Festivo>(`${this.url}modificar`, festivo);
  }

  public eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}eliminar/${id}`);
  }

  public getFestivosPorAnio(anio: number): Observable<Festivo[]> {
    return this.http.get<Festivo[]>(`${this.url}festivos-por-anio/${anio}`);
  }

  public validar(datetime: Date): Observable<boolean> {
    const year = datetime.getFullYear();
    const month = datetime.getMonth() + 1;
    const day = datetime.getDate();

    return this.http.get<boolean>(`${this.url}es-festivo/${year}/${month}/${day}`);
  }

  public obtenerTiposFestivo(): Observable<TipoFestivo[]> {
    return this.http.get<TipoFestivo[]>(`${this.url}tipos-festivo`);
  }

  public buscarAvanzado(param: { nombre?: string, mes?: number, idTipo?: number }): Observable<Festivo[]> {
    let params = new HttpParams();
    if (param.nombre) params = params.set('nombre', param.nombre);
    if (param.mes) params = params.set('mes', param.mes.toString());
    if (param.idTipo) params = params.set('idTipo', param.idTipo.toString());
    return this.http.get<Festivo[]>(`${this.url}buscar`, { params });
  }
}
