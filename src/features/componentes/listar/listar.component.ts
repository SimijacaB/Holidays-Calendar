import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FestivosService } from '../../../core/services/festivos.service';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [ReferenciasMaterialModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent {

    fechaSeleccionada: Date = new Date(); // Fecha actual por defecto
    anioSeleccionado: number = new Date().getFullYear(); // Año actual por defecto
    isLoading: boolean = false;
    mensajeResultado: string = '';
  
    constructor(private festivosService: FestivosService) {}


   // Obtener festivos por año
  obtenerFestivos() {
    if (!this.anioSeleccionado || this.anioSeleccionado < 1900 || this.anioSeleccionado > 2100) {
      alert('Por favor ingrese un año válido.');
      return;
    }

    this.isLoading = true;
    this.festivosService.getFestivosPorAnio(this.anioSeleccionado).subscribe({
      next: (festivos) => {
        this.isLoading = false;
        alert(`Festivos encontrados: ${festivos.length}`);
        console.log(festivos); // Mostrar festivos obtenidos en la consola
      },
      error: (err) => {
        this.isLoading = false;
        alert('Ocurrió un error al buscar los festivos.');
        console.error('Error al obtener festivos:', err);
      }
    });
  }

}
