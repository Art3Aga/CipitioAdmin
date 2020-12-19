import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//HTTP
import { HttpClientModule } from "@angular/common/http";


//Cambiar Lenguaje Pipe "Date"
import { registerLocaleData } from '@angular/common';
import localePy from '@angular/common/locales/es-PY';

//Angular Material
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from "@angular/material/button";
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';

//Forms
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';


//Componentes
import { MenuComponent } from './vistas/menu/menu.component';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';
import { RepartidoresComponent } from './vistas/repartidores/repartidores.component';
import { OpcionesUsuariosComponent } from './componentes/opciones-usuarios/opciones-usuarios.component';
import { AddRepartidorComponent } from './vistas/add-repartidor/add-repartidor.component';
import { OrdenesComponent } from './vistas/ordenes/ordenes.component';
import { OrdenComponent } from './componentes/orden/orden.component';
import { OrdeneDetalleComponent } from './vistas/ordene-detalle/ordene-detalle.component';
import { AsignarRepartidorComponent } from './vistas/asignar-repartidor/asignar-repartidor.component';
import { BebidasMenusComponent } from './vistas/bebidas-menus/bebidas-menus.component';
import { VistaMenusComponent } from './vistas/vista-menus/vista-menus.component';
import { BebidasComponent } from './vistas/bebidas/bebidas.component';
import { VistaBebidasComponent } from './vistas/vista-bebidas/vista-bebidas.component';
import { ClientesComponent } from './vistas/clientes/clientes.component';
import { ComidaUrlComponent } from './vistas/comida-url/comida-url.component';
import { NotFoundComponent } from './vistas/not-found/not-found.component';
import { LoginComponent } from './vistas/login/login.component';
import { CocinerosComponent } from './vistas/cocineros/cocineros.component';
import { GraficaOrdenesComponent } from './componentes/grafica-ordenes/grafica-ordenes.component';


//Charts
import { ChartsModule } from 'ng2-charts';
import { MapaRastreoRepartidoresComponent } from './componentes/mapa-rastreo-repartidores/mapa-rastreo-repartidores.component';
import { SeguimientoOrdenRepartidorComponent } from './componentes/seguimiento-orden-repartidor/seguimiento-orden-repartidor.component';

registerLocaleData(localePy, 'es');

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DashboardComponent,
    RepartidoresComponent,
    OpcionesUsuariosComponent,
    AddRepartidorComponent,
    OrdenesComponent,
    OrdenComponent,
    OrdeneDetalleComponent,
    AsignarRepartidorComponent,
    BebidasMenusComponent,
    VistaMenusComponent,
    BebidasComponent,
    VistaBebidasComponent,
    ClientesComponent,
    ComidaUrlComponent,
    NotFoundComponent,
    LoginComponent,
    CocinerosComponent,
    GraficaOrdenesComponent,
    MapaRastreoRepartidoresComponent,
    SeguimientoOrdenRepartidorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule, ReactiveFormsModule,
    MatSidenavModule, MatInputModule, MatSnackBarModule, MatIconModule,
    MatToolbarModule, MatListModule, MatButtonModule, MatTooltipModule,
    MatTabsModule, MatTableModule, MatPaginatorModule, MatBottomSheetModule,
    MatDialogModule, MatSlideToggleModule, MatMenuModule, MatSelectModule,
    ChartsModule, HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireStorageModule, // storage
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
