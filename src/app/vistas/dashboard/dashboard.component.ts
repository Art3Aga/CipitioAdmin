import { Orden } from './../../modelos/orden';
import { OrdenController } from './../../controladores/orden-controller.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  ordenes: Orden[] = [];
  ordenesEnCamino: Orden[] = [];
  ordenesEnProceso: Orden[] = [];
  ordenesEntregadas: Orden[] = [];

  constructor(private ordenController: OrdenController) { }

  ngOnInit(): void {
    this.getOrdenes();
  }

  getOrdenes() {
    this.ordenController.Ordenes().subscribe(
      ordenes => {
        this.ordenes = ordenes;
        this.ordenesEnCamino = ordenes.filter(orden => orden.estado == 'En Camino');
        this.ordenesEnProceso = ordenes.filter(orden => orden.estado == 'En Proceso');
        this.ordenesEntregadas = ordenes.filter(orden => orden.estado == 'Entregado');
      },
      error => console.log(error)
    )
  }

}
