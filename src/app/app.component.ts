import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ReferenciasMaterialModule } from '../shared/modulos/referencias-material.module';
import { LoginComponent } from '../features/componentes/login/login.component';
import { AutorizacionService } from '../core/services/autorizacion/autorizacion.service';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioResponseLoginDTO } from '../shared/DTOS/UsuarioResponseLoginDTO';
import { LoginService } from '../core/services/loginService/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    ReferenciasMaterialModule,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontedHolidaysCalendar';

  public opciones = [
    { titulo: "Festivo", url: "festivos", icono: "calendar_today" },
    { titulo: "Tipo Festivo", url: "tipo-festivo", icono: "category" }
  ];

  public usuarioActual: UsuarioResponseLoginDTO | null = null;

  constructor(
    private dialogServicio: MatDialog,
    private loginService: LoginService,
    private autorizacionServicio: AutorizacionService
  ) { }

  public login() {
    const dialogRef = this.dialogServicio.open(LoginComponent, {
      width: '400px',
      data: { usuario: "", clave: "" }
    });

    dialogRef.afterClosed().subscribe({
      next: datos => {
        if (datos) {
          this.loginService.login(datos.usuario, datos.clave).subscribe({
            next: response => {
              this.usuarioActual = { nombreUsuario: response.usuario.nombreUsuario, token: response.token };
              this.autorizacionServicio.guardarToken(response.token);
            },
            error: error => {
              console.error('Error de autenticación:', error);
            }
          })
        }
      }
    });
  }
}