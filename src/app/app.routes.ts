import { Routes } from '@angular/router';
import { InicioComponent } from '../features/componentes/inicio/inicio.component';
import { ListarComponent } from '../features/componentes/listar/listar.component';
import { FestivoCrudComponent } from '../features/componentes/festivo-crud/festivo-crud.component';
import { TipoFestivoCrudComponent } from '../features/componentes/tipo-festivo-crud/tipo-festivo-crud.component';
import { LoginComponent } from '../features/componentes/login/login.component';
import { authGuard } from '../core/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { 
        path: 'inicio', 
        component: InicioComponent,
        canActivate: [authGuard]
    },
    { 
        path: 'listar', 
        component: ListarComponent,
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
