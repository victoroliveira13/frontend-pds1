import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PesquisaPostosComponent } from './pesquisa-postos/pesquisa-postos.component';
import { ListaPrecosComponent } from './lista-precos/lista-precos.component';
import { LoginComponent } from './login/login.component';
import { DistribuidorComponent } from './distribuidor/distribuidor.component';
import { PostosComponent } from './postos/postos.component';

import { authGuard } from '../guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'pesquisa-postos', component: PesquisaPostosComponent, canActivate: [authGuard] },
  { path: 'lista-precos', component: ListaPrecosComponent, canActivate: [authGuard] },
  { path: 'distribuidor', component: DistribuidorComponent, canActivate: [authGuard] },
  { path: 'postos', component: PostosComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }, 
];
