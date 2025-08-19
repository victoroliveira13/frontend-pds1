import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { routes } from './app.routes';
import { DistribuidorComponent } from './distribuidor/distribuidor.component';
import { ListaPrecosComponent } from './lista-precos/lista-precos.component';
import { LoginComponent } from './login/login.component';
import { PesquisaPostosComponent } from './pesquisa-postos/pesquisa-postos.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DistribuidorComponent,
    ListaPrecosComponent,
    LoginComponent,
    PesquisaPostosComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes) // 💥 ESSENCIAL
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
