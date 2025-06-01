import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
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
export class AppComponent implements OnInit {
  title = 'FrontedHolidaysCalendar';

  public opciones = [
    { titulo: "Festivos", url: "festivo-crud", icono: "calendar_today" },
    { titulo: "Listar por Año", url: "festivos/por-anio", icono: "date_range" },
    { titulo: "Validar Festivo", url: "festivos/validar", icono: "check_circle" },
    { titulo: "Tipo Festivo", url: "tipo-festivo-crud", icono: "category" }
  ];

  public usuarioActual: UsuarioResponseLoginDTO | null = null;

  constructor(
    private dialogServicio: MatDialog,
    private loginService: LoginService,
    private autorizacionServicio: AutorizacionService,
    private router: Router
  ) { }

  ngOnInit() {
    // Verificar si hay un usuario autenticado al iniciar
    if (this.loginService.isAuthenticated()) {
      const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
      this.usuarioActual = {
        nombreUsuario: usuario.nombre,
        token: localStorage.getItem('token') || ''
      };
    }
  }

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

  public logout() {
    this.loginService.logout();
    this.usuarioActual = null;
    this.router.navigate(['/inicio']);
  }
}