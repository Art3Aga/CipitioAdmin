import { MenuComponent } from './vistas/menu/menu.component';
import { LoginComponent } from './vistas/login/login.component';
import { NotFoundComponent } from './vistas/not-found/not-found.component';
import { ComidaUrlComponent } from './vistas/comida-url/comida-url.component';
import { ClientesComponent } from './vistas/clientes/clientes.component';
import { VistaMenusComponent } from './vistas/vista-menus/vista-menus.component';
import { OrdenesComponent } from './vistas/ordenes/ordenes.component';
import { RepartidoresComponent } from './vistas/repartidores/repartidores.component';
import { UsuarioGuard } from './guards/usuario-guard.guard';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '404-not-found', component: NotFoundComponent },
  { path: 'cipitio/menus/:id_menu', component: ComidaUrlComponent },
  //{ path: '**', redirectTo: 'home' },
  { 
    path: 'home', component: MenuComponent, canActivate: [UsuarioGuard], children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, //al entrar al menu, lo primero que se verá será el dashboard
      { path: 'dashboard', component: DashboardComponent, canActivate: [ UsuarioGuard ] },
      { path: 'ordenes', component: OrdenesComponent, canActivate: [ UsuarioGuard ] },
      { path: 'menus_bebidas', component: VistaMenusComponent, canActivate: [ UsuarioGuard ] },
      { path: 'repartidores', component: RepartidoresComponent, canActivate: [ UsuarioGuard ] },
      { path: 'clientes', component: ClientesComponent, canActivate: [ UsuarioGuard ] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
