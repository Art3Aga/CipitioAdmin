import { DireccionesCliente } from './../../modelos/direcciones';
import { Clientes } from './../../modelos/clientes';
import { themeUber } from './../../modelos/themes_maps';
import { UsuarioController } from './../../controladores/usuario-controller.service';
import { UsuariosEmpresa } from './../../modelos/usuarios_empresa';
import { Orden } from './../../modelos/orden';
import { TrafficService } from './../../servicios/traffic-service.service';
import { OrdenController } from './../../controladores/orden-controller.service';
import { Component, OnInit, Input } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import * as Polyline from '@mapbox/polyline';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-seguimiento-orden-repartidor',
  templateUrl: './seguimiento-orden-repartidor.component.html',
  styleUrls: ['./seguimiento-orden-repartidor.component.scss']
})
export class SeguimientoOrdenRepartidorComponent implements OnInit {

  mapa: Mapboxgl.Map;
  @Input() orden: Orden;
  markers: {[key: string] : Mapboxgl.Marker} = {};
  repartidor: UsuariosEmpresa;

  constructor(private traffic: TrafficService, private ordenController: OrdenController,
    private usuarioController: UsuarioController) { }

  ngOnInit(): void {
    this.crearMapa();
  }

  crearMapa() {
    (Mapboxgl as any).accessToken = environment.mapbox_key;
    this.mapa = new Mapboxgl.Map({
      container: 'mapa',
      //style: 'mapbox://styles/mapbox/streets-v11',
      style: 'mapbox://styles/arteaga/ckis0ooe50i1419qkq1uknybd',
      center: [-88.17096193206221, 13.470968795509167],
      zoom: 13.5,
    });
    this.mapa.addControl(new Mapboxgl.NavigationControl());
    this.mapa.addControl(new Mapboxgl.ScaleControl({ maxWidth: 80, unit: 'metric' }));
    this.mapa.addControl(new Mapboxgl.FullscreenControl());
    this.usuarioController.RepartidorByOrden(this.orden.id_orden).subscribe(
      repartidores => {
        if(repartidores.length > 0) {
          if(repartidores[0]) {
            this.repartidor = repartidores[0]['repartidor'];
            this.orden = repartidores[0]['orden'];
            if(this.orden.estado == 'En Camino') {
              this.addMarkerRepartidor(this.repartidor);
            }
            this.usuarioController.GetClienteByID(this.orden.id_cliente).subscribe(
              clientes => {
                if(clientes.length > 0) {
                  if(clientes[0]) {
                    this.usuarioController.DireccionesByCliente(this.orden.id_cliente).subscribe(
                      direcciones => {
                        if(direcciones.length > 0) {
                          let direccionActualCliente = direcciones.find(direccion => direccion.activo = true);
                          this.addMarkerCliente(clientes[0], direccionActualCliente);
                          let inicioCliente = Number(direccionActualCliente.coordenadas.split(',')[1]);
                          let finCliente = Number(direccionActualCliente.coordenadas.split(',')[0]);
                          let inicioRepartidor = Number(this.repartidor.coordenadas.split(',')[1]);
                          let finRepartidor = Number(this.repartidor.coordenadas.split(',')[0]);
                          this.getCoordenadasInicioDestino(inicioCliente, finCliente, inicioRepartidor, finRepartidor);
                        }
                      }
                    );
                  }
                }
              }
            );
          }
        }
      }
    );
  }

  getCoordenadasInicioDestino(inicioCliente: number, finCliente: number, inicioRepartidor: number, finRepartidor: number) {
    //-88.17544173315089, 13.482889873757244, -88.18566142585505, 13.486703430222022
    this.traffic.getCoordenadasInicioDestino(inicioCliente, finCliente, inicioRepartidor, finRepartidor).subscribe(
      data => {
        this.drawPolyline(Polyline.toGeoJSON(data.routes[0].geometry, 6).coordinates);
        console.log(Polyline.toGeoJSON(data.routes[0].geometry, 6).coordinates);
      },
      error => console.log(error)
    );
  }

  drawPolyline(puntos: any[]) {

    this.mapa.on('load', () =>  {

      this.mapa.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': puntos
          }
        }
      });

      this.mapa.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
        'line-color': '#502f04',
        'line-width': 4
        }
      });

    });

  }

  addMarkerRepartidor(repartidor: UsuariosEmpresa) {

    if(this.markers[repartidor.id_usuario]) {
      this.markers[repartidor.id_usuario].setLngLat([Number(repartidor.coordenadas.split(',')[1]), Number(repartidor.coordenadas.split(',')[0])]);
    }
    else {
      const h2 = document.createElement('h2');
      h2.innerText = repartidor.nombre;

      const btnVerOrden = document.createElement('button');
      btnVerOrden.setAttribute('class', 'btn btn-info btn-block');
      btnVerOrden.innerText = 'Ver Orden';

      const div = document.createElement('div');
      div.append(h2, btnVerOrden);

      const popup = new Mapboxgl.Popup({
        offset: 25,
        closeOnClick: true
      }).setDOMContent(div);

      const marker = new Mapboxgl.Marker({
        draggable: false,
        color: repartidor.color
      }).setLngLat([Number(repartidor.coordenadas.split(',')[1]), Number(repartidor.coordenadas.split(',')[0])])
      .setPopup(popup).
      addTo(this.mapa);

      this.markers[repartidor.id_usuario] = marker;

      btnVerOrden.addEventListener('click', () =>  {
        this.ordenController.showSeguimientoOrden = false;
      });
    }

  }

  addMarkerCliente(cliente: Clientes, direccion: DireccionesCliente) {

    if(this.markers[cliente.id_cliente]) {
      this.markers[cliente.id_cliente].setLngLat([Number(direccion.coordenadas.split(',')[1]), Number(direccion.coordenadas.split(',')[0])]);
    }
    else {
      const h2 = document.createElement('h2');
      h2.innerText = cliente.nombre;

      const btnVerOrden = document.createElement('button');
      btnVerOrden.setAttribute('class', 'btn btn-info btn-block');
      btnVerOrden.innerText = 'Ver Orden';

      const div = document.createElement('div');
      div.append(h2, btnVerOrden);

      const popup = new Mapboxgl.Popup({
        offset: 25,
        closeOnClick: true
      }).setDOMContent(div);

      const marker = new Mapboxgl.Marker({
        draggable: false,
        color: '#502f04'
      }).setLngLat([Number(direccion.coordenadas.split(',')[1]), Number(direccion.coordenadas.split(',')[0])])
      .setPopup(popup).
      addTo(this.mapa);

      this.markers[cliente.id_cliente] = marker;

      btnVerOrden.addEventListener('click', () =>  {
        this.ordenController.showSeguimientoOrden = false;
      });
    }

  }

}
