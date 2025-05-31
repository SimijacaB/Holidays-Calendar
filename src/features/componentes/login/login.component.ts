import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../../core/services/loginService/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReferenciasMaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  nombreUsuario: string = '';
  clave: string = '';
  loading: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {
    // Si el usuario ya está autenticado, redirigir al inicio
    if (this.loginService.isAuthenticated()) {
      this.router.navigate(['/inicio']);
    }
  }

  onSubmit() {
    if (!this.nombreUsuario || !this.clave) {
      this.snackBar.open('Por favor complete todos los campos', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    this.loading = true;
    this.loginService.login(this.nombreUsuario, this.clave).subscribe({
      next: (response) => {
        if (response && response.usuario && response.token) {
          this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', {
            duration: 3000
          });
          this.dialogRef.close({ usuario: this.nombreUsuario, clave: this.clave });
        } else {
          this.snackBar.open('Credenciales inválidas', 'Cerrar', {
            duration: 3000
          });
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Error de login:', error);
        this.snackBar.open(
          'Usuario o contraseña incorrectos',
          'Cerrar',
          { duration: 3000 }
        );
        this.loading = false;
        // Limpiar los campos en caso de error
        this.nombreUsuario = '';
        this.clave = '';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
