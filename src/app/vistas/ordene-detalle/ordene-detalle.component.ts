import { MenuController } from './../../controladores/menu-controller.service';
import { Recursos } from './../../servicios/recursos.service';
import { UsuarioController } from './../../controladores/usuario-controller.service';
import { OrdenController } from './../../controladores/orden-controller.service';
import { UsuariosEmpresa } from './../../modelos/usuarios_empresa';
import { DireccionesCliente } from './../../modelos/direcciones';
import { Clientes } from './../../modelos/clientes';
import { Orden } from './../../modelos/orden';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordene-detalle',
  templateUrl: './ordene-detalle.component.html',
  styleUrls: ['./ordene-detalle.component.scss']
})
export class OrdeneDetalleComponent implements OnInit {

  @Input() ordenSeleccionada: Orden;
  cargando: boolean = false;
  cliente: Clientes;
  direcciones: DireccionesCliente[] = []
  direccionActual: DireccionesCliente;
  imageStyle: any;
  repartidor: UsuariosEmpresa;

  constructor(public ordenController: OrdenController, private usuarioController: UsuarioController, private menuController: MenuController,
    public recursos: Recursos) { }

  ngOnInit(): void {
    this.GetOrdenByID();
    this.GetClienteByID();
    this.GetRepartidorByOrden();
  }

  GetOrdenByID() {
    this.ordenController.GetOrdenByID(this.ordenSeleccionada.id_orden).subscribe(
      ordenes => {
        if(ordenes[0]) {
          this.ordenSeleccionada = ordenes[0];
          if(ordenes[0].menus.length > 0) {
            this.ImageStyle(ordenes[0].menus[0]?.imagen); // asignar la imagen del primer menu de la orden (si existe)
          }
          else {
            this.ImageStyle(ordenes[0].promociones[0]?.imagen); // asignar la imagen de la primer promocionxxxx de la orden (si existe)
          }
        }
      },
      error => console.log(error)
    );
  }

  GetClienteByID() {
    this.usuarioController.GetClienteByID(this.ordenSeleccionada.id_cliente).subscribe(
      data => {
        if(data) {
          this.cliente = data[0];
          this.DireccionesByCliente();
        }
      },
      error => console.log(error)
    );
  }


  DireccionesByCliente() {
    this.usuarioController.DireccionesByCliente(this.ordenSeleccionada.id_cliente).subscribe(
      data => {
        if(data) {
          this.direcciones = data;
          this.direccionActual = this.direcciones.find(direccion => direccion.activo == true);
        }
      },
      error => console.log(error)
    );
  }

  GetRepartidorByOrden() {
    this.usuarioController.RepartidorByOrden(this.ordenSeleccionada.id_orden).subscribe(
      data => {
        if(data[0]) {
          this.repartidor = data[0]['repartidor'];
        }
        else {
          this.repartidor = null;
        }
      },
      error => console.log(error)
    );
  }

  ImageStyle(url_image: string): any {
    const styles = {
      'color': '#ffffff',
      'background-image': `linear-gradient(rgba(36, 38, 53, 0.513), rgba(36, 38, 53, 0.513)), url(${url_image})`,
      'background-position': 'center',
      'background-repeat': 'no-repeat',
      'background-size': '100% 95%'
    };
    this.imageStyle = styles;
  }

  public Tiempo12H(horas: any, minutos: any): string {
    const AM_PM = horas >= 12 ? 'PM' : 'AM';
    horas = horas % 12;
    horas = horas ? horas : 12;
    minutos = minutos < 10 ? `0${minutos}` : minutos;
    return `${horas}:${minutos} ${AM_PM}`;
  }

}
