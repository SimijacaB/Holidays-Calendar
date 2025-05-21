import { Component, OnInit } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FestivosService } from '../../../core/services/festivoService/festivos.service';
import { Festivo } from '../../../shared/entidades/festivo';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [ReferenciasMaterialModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent implements OnInit {
  columnasMostradas: string[] = ['nombre', 'fecha'];
  festivos: Festivo[] = [];
  anioSeleccionado: number = new Date().getFullYear();
  isLoading: boolean = false;
  mensajeResultado: string = '';
  error: string = '';

  constructor(private festivosService: FestivosService) { }

  ngOnInit() {
    // Ya no cargamos los datos automáticamente
  }

  obtenerFestivos() {
    if (!this.validarAnio()) {
      return;
    }

    this.isLoading = true;
    this.mensajeResultado = '';
    this.error = '';
    this.festivos = [];

    this.festivosService.getFestivosPorAnio(this.anioSeleccionado)
      .pipe(
        catchError(error => {
          this.error = 'Ocurrió un error al cargar los festivos. Por favor, intente nuevamente.';
          console.error('Error al cargar festivos:', error);
          return of([]);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(festivos => {
        if (festivos.length === 0 && !this.error) {
          this.mensajeResultado = `No se encontraron festivos para el año ${this.anioSeleccionado}`;
          return;
        }

        this.festivos = festivos.map(festivo => {
          try {
            return {
              ...festivo,
              fecha: this.construirFecha(this.anioSeleccionado, festivo.mes, festivo.dia)
            };
          } catch (error) {
            console.error(`Error al construir fecha para festivo ${festivo.nombre}:`, error);
            return festivo;
          }
        });

        this.mensajeResultado = `Se encontraron ${this.festivos.length} festivos para el año ${this.anioSeleccionado}`;
      });
  }

  private validarAnio(): boolean {
    if (!this.anioSeleccionado || this.anioSeleccionado < 1900 || this.anioSeleccionado > 2100) {
      this.mensajeResultado = 'Por favor ingrese un año válido (1900-2100)';
      return false;
    }
    return true;
  }

  private construirFecha(anio: number, mes: number, dia: number): Date {
    const fecha = new Date(anio, mes - 1, dia);
    
    // Validar que la fecha sea válida
    if (isNaN(fecha.getTime())) {
      throw new Error(`Fecha inválida: año=${anio}, mes=${mes}, dia=${dia}`);
    }
    
    return fecha;
  }
}


