import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FestivosService } from '../../../core/services/festivoService/festivos.service';
import { Festivo, TipoFestivo } from '../../../shared/entidades/festivo';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-festivo-crud',
  standalone: true,
  imports: [CommonModule, FormsModule, ReferenciasMaterialModule],
  templateUrl: './festivo-crud.component.html',
  styleUrl: './festivo-crud.component.css'
})
export class FestivoCrudComponent implements OnInit {
  festivos: Festivo[] = [];
  festivoSeleccionado: Festivo | null = null;
  modoEdicion: boolean = false;
  isLoading: boolean = false;
  mensajeResultado: string = '';
  error: string = '';
  tiposFestivo: TipoFestivo[] = [
    { id: 1, tipo: 'Fijo' },
    { id: 2, tipo: 'Ley Puente Festivo' },
    { id: 3, tipo: 'Basado en Pascua' },
    { id: 4, tipo: 'Basado en Pascua y Ley Puente Festivo' }
  ];

  // Opciones de búsqueda
  opcionesBusqueda = [
    { valor: 0, texto: 'Nombre' },
    { valor: 1, texto: 'Tipo' }
  ];
  opcionSeleccionada: number = 0;
  terminoBusqueda: string = '';

  // Nombres de los meses en español
  private meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  constructor(private festivosService: FestivosService) {}

  ngOnInit(): void {
    // Solo inicializamos lo necesario, no cargamos tipos de festivo desde el backend
  }

  obtenerNombreMes(mes: number): string {
    return this.meses[mes - 1];
  }

  buscarFestivos(): void {
    if (!this.terminoBusqueda.trim()) {
      this.error = 'Por favor ingrese un término de búsqueda';
      return;
    }

    this.isLoading = true;
    this.error = '';
    this.mensajeResultado = '';

    this.festivosService.buscar(this.opcionSeleccionada, this.terminoBusqueda).subscribe({
      next: (data) => {
        this.festivos = data;
        this.isLoading = false;
        this.mensajeResultado = data.length > 0 
          ? `Se encontraron ${data.length} festivos` 
          : 'No se encontraron festivos';
      },
      error: (error) => {
        this.error = 'Error al buscar los festivos';
        this.isLoading = false;
        console.error('Error:', error);
      }
    });
  }

  cargarTodos(): void {
    this.isLoading = true;
    this.error = '';
    this.mensajeResultado = '';
    this.terminoBusqueda = '';

    this.festivosService.listar().subscribe({
      next: (data) => {
        this.festivos = data;
        this.isLoading = false;
        this.mensajeResultado = `Se cargaron ${data.length} festivos`;
      },
      error: (error) => {
        this.error = 'Error al cargar los festivos';
        this.isLoading = false;
        console.error('Error:', error);
      }
    });
  }

  seleccionarFestivo(festivo: Festivo): void {
    this.festivoSeleccionado = { ...festivo };
    this.modoEdicion = true;
  }

  nuevoFestivo(): void {
    this.festivoSeleccionado = {
      id: 0,
      nombre: '',
      dia: 1,
      mes: 1,
      idTipo: 1,
      diasPascua: 0,
      tipoFestivo: undefined
    };
    this.modoEdicion = true;
  }

  guardarFestivo(): void {
    if (!this.festivoSeleccionado) return;

    this.isLoading = true;
    const operacion = this.festivoSeleccionado.id === 0
      ? this.festivosService.agregar(this.festivoSeleccionado)
      : this.festivosService.modificar(this.festivoSeleccionado);

    operacion.subscribe({
      next: () => {
        this.mensajeResultado = `Festivo ${this.festivoSeleccionado?.id === 0 ? 'agregado' : 'modificado'} exitosamente`;
        this.buscarFestivos(); // Recargamos la búsqueda actual
        this.cancelarEdicion();
      },
      error: (error) => {
        this.error = `Error al ${this.festivoSeleccionado?.id === 0 ? 'agregar' : 'modificar'} el festivo`;
        this.isLoading = false;
        console.error('Error:', error);
      }
    });
  }

  eliminarFestivo(id: number): void {
    if (confirm('¿Está seguro de eliminar este festivo?')) {
      this.isLoading = true;
      this.festivosService.eliminar(id).subscribe({
        next: (success) => {
          if (success) {
            this.mensajeResultado = 'Festivo eliminado exitosamente';
            this.buscarFestivos(); // Recargamos la búsqueda actual
          } else {
            this.error = 'No se pudo eliminar el festivo';
          }
          this.isLoading = false;
        },
        error: (error) => {
          this.error = 'Error al eliminar el festivo';
          this.isLoading = false;
          console.error('Error:', error);
        }
      });
    }
  }

  cancelarEdicion(): void {
    this.festivoSeleccionado = null;
    this.modoEdicion = false;
    this.error = '';
    this.mensajeResultado = '';
  }

  getPlaceholder(): string {
    switch (this.opcionSeleccionada) {
      case 0: return 'Ingrese el nombre del festivo';
      case 1: return 'Ingrese el tipo de festivo';
      default: return 'Buscar';
    }
  }

  onOpcionBusquedaChange(): void {
    this.terminoBusqueda = '';
  }
}
