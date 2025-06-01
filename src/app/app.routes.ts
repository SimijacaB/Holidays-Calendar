import { Routes } from '@angular/router';
import { InicioComponent } from '../features/componentes/inicio/inicio.component';
import { ListarComponent } from '../features/componentes/listar/listar.component';
import { FestivoCrudComponent } from '../features/componentes/festivo-crud/festivo-crud.component';
import { TipoFestivoCrudComponent } from '../features/componentes/tipo-festivo-crud/tipo-festivo-crud.component';
import { LoginComponent } from '../features/componentes/login/login.component';
import { authGuard } from '../core/guards/auth.guard';
import { ValidarFestivoComponent } from '../features/componentes/validar-festivo/validar-festivo.component';

export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },

    {
        path: 'inicio',
        component: InicioComponent,
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'festivos',
        component: ListarComponent,
        canActivate: [authGuard]
    },
    {
        path: 'festivos/por-anio',
        component: ListarComponent,
        canActivate: [authGuard]
    },
    {
        path: 'festivos/validar',
        component: ValidarFestivoComponent,
        canActivate: [authGuard]
    },
    {
        path: 'festivo-crud',
        component: FestivoCrudComponent,
        canActivate: [authGuard]
    },
    {
        path: 'tipo-festivo-crud',
        component: TipoFestivoCrudComponent,
        canActivate: [authGuard]
    }
];
