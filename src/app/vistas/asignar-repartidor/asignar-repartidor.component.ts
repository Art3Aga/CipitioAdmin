import { OrdenController } from './../../controladores/orden-controller.service';
import { UsuarioController } from './../../controladores/usuario-controller.service';
import { Recursos } from './../../servicios/recursos.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosEmpresa } from './../../modelos/usuarios_empresa';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-asignar-repartidor',
  templateUrl: './asignar-repartidor.component.html',
  styleUrls: ['./asignar-repartidor.component.scss']
})
export class AsignarRepartidorComponent implements OnInit {

  cargando: boolean = false;
  repartidores: UsuariosEmpresa[] = [];
  repartidorSeleccionado: UsuariosEmpresa;
  indexRepartidor: number;

  constructor(public dialogRef: MatDialogRef<AsignarRepartidorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private usuariosController: UsuarioController, private recursos: Recursos,
    private ordenController: OrdenController) { }

  ngOnInit(): void {
    this.GetRepartidores();
  }

  GetRepartidores() {
    this.cargando = true;
    this.usuariosController.Repartidores().subscribe(
      repartidores => {
        this.cargando = false;
        this.repartidores = repartidores;
      },
      error => console.log(error)
    );
  }
  seleccionarRepartidor(repartidor: UsuariosEmpresa, index: number) {
    this.repartidorSeleccionado = repartidor;
    this.indexRepartidor = index;
  }

  asignarRepartidor() {
    this.recursos.msmmConfirmarAccion(`¿Seguro desea asignar a ${this.repartidorSeleccionado.nombre} a esta Orden?`, 'Asignar', () => this.cerrar());
  }

  cerrar() {
    this.data.orden.estado = 'Asignado';
    this.ordenController.AsignarRepartidorOrden(this.repartidorSeleccionado, this.data.orden).then(
      repartidorAsignado => {
        this.dialogRef.close();
        this.recursos.msmSuccess(`${repartidorAsignado.nombre} Asignado a la Orden de ${this.data.cliente.nombre}`, 2000);
        this.repartidorSeleccionado = null;
        this.indexRepartidor = null;
      },
      error => console.log(error)
    );
  }

}
