import { Component } from '@angular/core';
import { FestivosService } from '../../../core/services/festivoService/festivos.service';
import { HttpClientModule } from '@angular/common/http';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';


@Component({
  selector: 'app-validar-festivo',
  standalone: true,
  imports: [ReferenciasMaterialModule, HttpClientModule],
  templateUrl: './validar-festivo.component.html',
  styleUrl: './validar-festivo.component.css'
})
export class ValidarFestivoComponent {

  fechaSeleccionada: Date = new Date(); // Fecha actual por defecto
  anioSeleccionado: number = new Date().getFullYear(); // Año actual por defecto
  isLoading: boolean = false;
  mensajeResultado: string = '';

  constructor(private festivosService: FestivosService) {}

  // Validar si la fecha es festivo
  validarFecha() {
    if (!this.fechaSeleccionada) {
      this.mensajeResultado = 'Por favor seleccione una fecha.';
      return;
    }

    this.isLoading = true;
    this.festivosService.validar(this.fechaSeleccionada).subscribe({
      next: (esFestivo: boolean) => {
        this.isLoading = false;
        this.mensajeResultado = esFestivo
          ? '¡Es un día festivo! 🎉'
          : 'No es festivo 😐';
      },
      error: (err) => {
        this.isLoading = false;
        this.mensajeResultado = 'Ocurrió un error al validar la fecha.';
        console.error('Error al validar fecha:', err);
      }
    });
  }


}
