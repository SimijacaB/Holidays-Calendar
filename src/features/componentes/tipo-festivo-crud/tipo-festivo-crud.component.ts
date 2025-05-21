import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { TipoFestivoService } from '../../../core/services/tipoFestivoService/tipo-festivo.service';
import { TipoFestivo } from '../../../shared/entidades/festivo';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-tipo-festivo-crud',
  standalone: true,
  imports: [CommonModule, FormsModule, ReferenciasMaterialModule],
  templateUrl: './tipo-festivo-crud.component.html',
  styleUrl: './tipo-festivo-crud.component.css'
})
export class TipoFestivoCrudComponent implements OnInit {
  tiposFestivo: TipoFestivo[] = [];
  tipoFestivoSeleccionado: TipoFestivo | null = null;
  modoEdicion: boolean = false;
  isLoading: boolean = false;
  mensajeResultado: string = '';
  error: string = '';

  // Opciones de búsqueda
  opcionesBusqueda = [
    { valor: 0, texto: 'ID' },
    { valor: 1, texto: 'Nombre' }
  ];
  opcionSeleccionada: number = 0;
  terminoBusqueda: string = '';

  constructor(private tipoFestivoService: TipoFestivoService) {}

  ngOnInit(): void {
    // Inicialización sin carga de datos
  }

  cargarTiposFestivo(): void {
    this.isLoading = true;
    this.error = '';
    this.mensajeResultado = '';
    this.terminoBusqueda = '';

    this.tipoFestivoService.listar().subscribe({
      next: (data) => {
        this.tiposFestivo = data;
        this.isLoading = false;
        this.mensajeResultado = `Se cargaron ${data.length} tipos de festivo`;
      },
      error: (error) => {
        this.error = 'Error al cargar los tipos de festivo';
        this.isLoading = false;
        console.error('Error:', error);
      }
    });
  }

  buscarTiposFestivo(): void {
    if (!this.terminoBusqueda.trim()) {
      this.error = 'Por favor ingrese un término de búsqueda';
      return;
    }

    this.isLoading = true;
    this.error = '';
    this.mensajeResultado = '';
    this.tiposFestivo = []; // Limpiamos los resultados anteriores

    // Si estamos buscando por ID, validamos que sea un número
    if (this.opcionSeleccionada === 0) {
      const id = parseInt(this.terminoBusqueda);
      if (isNaN(id)) {
        this.error = 'El ID debe ser un número válido';
        this.isLoading = false;
        return;
      }
      // Si es búsqueda por ID, usamos el método obtener
      this.tipoFestivoService.obtener(id).pipe(
        catchError(error => {
          this.error = `No existe ningún tipo de festivo con el ID ${id}`;
          this.isLoading = false;
          return of(null);
        })
      ).subscribe(data => {
        if (data) {
          this.tiposFestivo = [data];
          this.mensajeResultado = 'Tipo de festivo encontrado';
        }
        this.isLoading = false;
      });
    } else {
      // Si es búsqueda por nombre, usamos el método buscar
      console.log('Buscando por nombre:', this.terminoBusqueda.trim());
      this.tipoFestivoService.buscar(1, this.terminoBusqueda.trim()).subscribe({
        next: (data) => {
          console.log('Respuesta de búsqueda:', data);
          this.tiposFestivo = data;
          this.isLoading = false;
          if (data.length === 0) {
            this.mensajeResultado = 'No se encontraron tipos de festivo';
          } else {
            this.mensajeResultado = `Se encontraron ${data.length} tipos de festivo`;
          }
        },
        error: (error) => {
          console.error('Error en la búsqueda:', error);
          this.error = 'Error al buscar los tipos de festivo';
          this.isLoading = false;
        }
      });
    }
  }

  guardarTipoFestivo(): void {
    if (!this.tipoFestivoSeleccionado) return;

    this.isLoading = true;
    const operacion = this.tipoFestivoSeleccionado.id === 0
      ? this.tipoFestivoService.agregar(this.tipoFestivoSeleccionado)
      : this.tipoFestivoService.modificar(this.tipoFestivoSeleccionado);

    operacion.subscribe({
      next: () => {
        this.mensajeResultado = `Tipo de festivo ${this.tipoFestivoSeleccionado?.id === 0 ? 'agregado' : 'modificado'} exitosamente`;
        this.cargarTiposFestivo(); // Recargamos la lista
        this.cancelarEdicion();
      },
      error: (error) => {
        this.error = `Error al ${this.tipoFestivoSeleccionado?.id === 0 ? 'agregar' : 'modificar'} el tipo de festivo`;
        this.isLoading = false;
        console.error('Error:', error);
      }
    });
  }

  eliminarTipoFestivo(id: number): void {
    if (confirm('¿Está seguro de eliminar este tipo de festivo?')) {
      this.isLoading = true;
      this.tipoFestivoService.eliminar(id).subscribe({
        next: (success) => {
          if (success) {
            this.mensajeResultado = 'Tipo de festivo eliminado exitosamente';
            this.cargarTiposFestivo(); // Recargamos la lista
          } else {
            this.error = 'No se pudo eliminar el tipo de festivo';
          }
          this.isLoading = false;
        },
        error: (error) => {
          this.error = 'Error al eliminar el tipo de festivo';
          this.isLoading = false;
          console.error('Error:', error);
        }
      });
    }
  }

  seleccionarTipoFestivo(tipoFestivo: TipoFestivo): void {
    this.tipoFestivoSeleccionado = { ...tipoFestivo };
    this.modoEdicion = true;
  }

  nuevoTipoFestivo(): void {
    this.tipoFestivoSeleccionado = {
      id: 0,
      tipo: ''
    };
    this.modoEdicion = true;
  }

  cancelarEdicion(): void {
    this.tipoFestivoSeleccionado = null;
    this.modoEdicion = false;
  }

  getPlaceholder(): string {
    switch (this.opcionSeleccionada) {
      case 0: return 'Ingrese el ID del tipo de festivo';
      case 1: return 'Ingrese el nombre del tipo de festivo';
      default: return 'Buscar';
    }
  }
}
