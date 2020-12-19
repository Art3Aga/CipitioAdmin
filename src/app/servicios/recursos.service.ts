import { BebidasMenusComponent } from './../vistas/bebidas-menus/bebidas-menus.component';
import { Menu } from './../modelos/menus';
import { AsignarRepartidorComponent } from './../vistas/asignar-repartidor/asignar-repartidor.component';
import { Clientes } from './../modelos/clientes';
import { Orden } from './../modelos/orden';
import { UsuariosEmpresa } from './../modelos/usuarios_empresa';
import { AddRepartidorComponent } from './../vistas/add-repartidor/add-repartidor.component';
import { OpcionesUsuariosComponent } from './../componentes/opciones-usuarios/opciones-usuarios.component';
import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Recursos {

  constructor(private snackBar: MatSnackBar, private _bottomSheet: MatBottomSheet,
    private dialog: MatDialog, private route: Router) { }


  showMessage(mensaje: string, color: string) {
    this.snackBar.open(mensaje, '', {
      duration: 3000,
      panelClass: color,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  msmError(title: string, text: string) {
    Swal.fire({
      icon: 'error', title, text,
    });
  }

  msmSuccess(title: string, timer: number) {
    Swal.fire({
      icon: 'success',
      title,
      showConfirmButton: false,
      timer
    });
  }

  msmmConfirmar(title: string, confirmButtonText: string, msmConfirmacion: string, callback: Function) {
    Swal.fire({
      title,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: 'var(--primario)'
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
        localStorage.removeItem('user');
        Swal.fire(msmConfirmacion, '', 'success');
      }
    })
  }

  msmmConfirmarAccion(title: string, confirmButtonText: string, callback: Function) {
    Swal.fire({
      title,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: 'var(--primario)'
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    });
  }


  addRepartidorModal() {
    const dialogRef = this.dialog.open(AddRepartidorComponent, {
      width: '50vw',
      height: '80vh',
      minHeight: '50vh',
      minWidth: '50vw',
      panelClass: 'dialog-addmenu',
    });

    dialogRef.afterClosed().subscribe(
      result => {

      }
    );
  }

  opciones_usuarios(usuario: any) {
    this._bottomSheet.open(OpcionesUsuariosComponent, {
      data: usuario
    });
  }

  add_updateMenu(menu?: Menu) {
    let menos500px = window.matchMedia('(max-width: 500px)').matches;
    const dialogRef = this.dialog.open(BebidasMenusComponent, {
      width: menos500px ? '800px' : '600px',
      height: menos500px ? '70%' : '70%',
      position: { top: menos500px ? '140px' : '50px', left: '' },
      data: menu
    });
  }

  asignarRepartidorModal(orden: Orden, cliente: Clientes) {
    let menos500px = window.matchMedia('(max-width: 500px)').matches;
    const dialogRef = this.dialog.open(AsignarRepartidorComponent, {
      width: menos500px ? '800px' : '600px',
      height: menos500px ? '70%' : '70%',
      position: { top: menos500px ? '140px' : '50px', left: '' },
      data: { orden, cliente }
    });
  }

}
