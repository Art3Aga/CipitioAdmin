import { UsuarioController } from './../../controladores/usuario-controller.service';
import { OrdenController } from './../../controladores/orden-controller.service';
import { Clientes } from './../../modelos/clientes';
import { Orden } from './../../modelos/orden';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.scss']
})
export class OrdenComponent implements OnInit {

  @Input() orden: Orden;
  //pedidos: Pedido[] = [];
  cliente: Clientes;
  cargando: boolean = false;

  constructor(public ordenController: OrdenController, private usuarioController: UsuarioController) { }

  ngOnInit(): void {
  }

  mostrarOrdenDetalle() {
    this.ordenController.showOrdenDetalle = true;
    this.ordenController.ordenSeleccionada = this.orden;
  }

  public Tiempo12H(horas: any, minutos: any): string {
    const AM_PM = horas >= 12 ? 'PM' : 'AM';
    horas = horas % 12;
    horas = horas ? horas : 12;
    minutos = minutos < 10 ? `0${minutos}` : minutos;
    return `${horas}:${minutos} ${AM_PM}`;
  }

}
