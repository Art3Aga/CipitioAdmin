import { OrdenController } from './../../controladores/orden-controller.service';
import { Recursos } from './../../servicios/recursos.service';
import { Orden } from './../../modelos/orden';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.scss']
})
export class OrdenesComponent implements OnInit {

  ordenes: Orden[] = [];
  ordenesEnProceso: Orden[] = [];
  ordenesEnCamino: Orden[] = [];
  ordenesEntregadas: Orden[] = [];
  ordenesAsignadas: Orden[] = [];
  ordenesNoEntregadas: Orden[] = [];
  cargando: boolean = false;
  buscador: string = '';
  filtroOrdenes: Orden[] = [];

  constructor(public recursos: Recursos, public ordenController: OrdenController) { }

  ngOnInit(): void {
    this.getOrdenes();
    console.log(new Date().valueOf());

  }

  getOrdenes() {
    this.cargando = true;
    this.ordenController.Ordenes().subscribe(
      ordenes => {
        this.cargando = false;
        //this.ordenes = ordenes.filter(orden => orden.id_orden > new Date().valueOf());
        this.ordenes = ordenes;
        this.filtroOrdenes = this.ordenes;
        this.ordenesEnProceso = this.ordenes.filter(orden => orden.estado == 'En Proceso');
        this.ordenesAsignadas = this.ordenes.filter(orden => orden.estado == 'Asignado');
        this.ordenesEnCamino = this.ordenes.filter(orden => orden.estado == 'En Camino');
        this.ordenesEntregadas = this.ordenes.filter(orden => orden.estado == 'Entregado');
        this.ordenesNoEntregadas = this.ordenes.filter(orden => orden.estado == 'No Entregado');
        //ordenes.forEach(orden =>  console.log(new Date(orden.fecha).valueOf()));
      },
      error => console.log(error)
    );
  }

  buscarOrden() {
    if(this.buscador == '') {
      this.filtroOrdenes = this.ordenes;
    }
    else {
      this.filtroOrdenes = this.ordenes.filter(orden => orden.id_orden.toString().includes(this.buscador.trim().toLocaleLowerCase()));
    }
  }

  limpiarBusqueda() {
    this.buscador = '';
    this.buscarOrden();
  }

}
