import { Routes } from '@angular/router';
import { InicioComponent } from '../features/componentes/inicio/inicio.component';
import { ListarComponent } from '../features/componentes/listar/listar.component';

export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' }, // 👈 redirección
    { path: 'inicio', component: InicioComponent },
    { path: 'listar', component: ListarComponent}
]
