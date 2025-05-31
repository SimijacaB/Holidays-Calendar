import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
// import { MatDialog } from '@angular/material/dialog'; // Removed as login will be a separate page
// import { LoginComponent } from '../login/login.component'; // Removed as login will be a separate page

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ReferenciasMaterialModule, HttpClientModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
// Removed login logic as it will be handled by routing to a login page
export class InicioComponent {
  constructor(/* private dialogServicio: MatDialog */) { }

  // Removed public login() method
}