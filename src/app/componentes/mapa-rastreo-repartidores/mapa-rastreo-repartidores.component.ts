import { UsuarioController } from './../../controladores/usuario-controller.service';
import { UsuariosEmpresa } from './../../modelos/usuarios_empresa';
import { Orden } from './../../modelos/orden';
import { TrafficService } from './../../servicios/traffic-service.service';
import { OrdenController } from './../../controladores/orden-controller.service';
import { Component, OnInit, Input } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import * as Polyline from '@mapbox/polyline';
import { environment } from 'src/environments/environment';


/*
  ===== Depedencias a Instalar =====
  npm i @types/mapbox-gl --dev-save
  npm i @mapbox/polyline
  npm i mapbox-gl --save
  npm i @types/mapbox__polyline@1.0.0

*/

@Component({
  selector: 'app-mapa-rastreo-repartidores',
  templateUrl: './mapa-rastreo-repartidores.component.html',
  styleUrls: ['./mapa-rastreo-repartidores.component.scss']
})

export class MapaRastreoRepartidoresComponent implements OnInit {

  mapa: Mapboxgl.Map;
  ordenes: Orden[] = [];
  ordenesEnCamino: Orden[] = [];
  repartidores: UsuariosEmpresa[] = [];
  markers: {[key: string] : Mapboxgl.Marker} = {};
  repartidorEnSeguimiento: UsuariosEmpresa;

  constructor(public ordenController: OrdenController, private traffic: TrafficService,
    private usuarioController: UsuarioController) { }

  ngOnInit(): void {
    this.crearMapa();
  }

  getRepartidoresActivos() {
    /*this.ordenController.OrdenesEnCaminoRepartidor().subscribe(
      ordenes_repartidor => {
        if(ordenes_repartidor.length > 0) {
          ordenes_repartidor.forEach(orden_repartidor => {
            this.ordenesEnCamino.push(orden_repartidor['orden']);
            this.repartidores.push(orden_repartidor['repartidor']);
          });
        }

        if(this.ordenesEnCamino.length > 0) {
          this.crearMapa();
        }
      },
      error => console.log(error)
    );*/
  }

  crearMapa() {
    (Mapboxgl as any).accessToken = environment.mapbox_key;
    this.mapa = new Mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/arteaga/ckis0ooe50i1419qkq1uknybd',
      center: [-88.17096193206221, 13.470968795509167],
      zoom: 13.5,
    });
    this.mapa.addControl(new Mapboxgl.NavigationControl());
    this.mapa.addControl(new Mapboxgl.ScaleControl({ maxWidth: 80, unit: 'metric' }));
    this.mapa.addControl(new Mapboxgl.FullscreenControl());

    this.usuarioController.Repartidores().subscribe(
      repartidores => {
        this.repartidores = repartidores.filter(repartidor => repartidor.estado == 'Activo');
        this.repartidores.forEach(repartidor => {
          this.addMarker(repartidor);
        });
      },
      error => console.log(error)
    );
    //this.getCoordenadasInicioDestino();
    //this.addMarker(-88.17544173315089, 13.482889873757244, 'Juan Perez Lazo');
    //this.addMarker(-88.18566142585505, 13.486703430222022, 'Cliente');
  }

  getCoordenadasInicioDestino() {
    this.traffic.getCoordenadasInicioDestino(-88.17544173315089, 13.482889873757244, -88.18566142585505, 13.486703430222022).subscribe(
      data => {
        this.drawPolyline(Polyline.toGeoJSON(data.routes[0].geometry, 6).coordinates);
      },
      error => console.log(error)
    );

  }

  changeStyleMap() {
    var layerList = document.getElementById('menu');
    var inputs = layerList.getElementsByTagName('input');

    function switchLayer(layer) {
      var layerId = layer.target.id;
      this.mapa.setStyle('mapbox://styles/mapbox/' + layerId);
    }

    for (var i = 0; i < inputs.length; i++) {
      inputs[i].onclick = switchLayer;
    }
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


  addMarker(repartidor: UsuariosEmpresa) {

    if(repartidor.estado == 'Activo') {
      if(this.markers[repartidor.id_usuario]) {
        this.markers[repartidor.id_usuario].setLngLat([Number(repartidor.coordenadas.split(',')[1]), Number(repartidor.coordenadas.split(',')[0])]);
      }
      else {
        const h2 = document.createElement('h2');
        h2.innerText = repartidor.nombre;

        const btnBorrar = document.createElement('button');
        btnBorrar.setAttribute('class', 'btn btn-info btn-block');
        btnBorrar.innerText = 'Ver Orden';

        const div = document.createElement('div');
        //div.append(h2, btnBorrar);
        div.append(h2);

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

        //btnBorrar.addEventListener('click', () =>  {});
      }
    }

  }

  seguirRepartidor(repartidor: UsuariosEmpresa) {
    this.repartidorEnSeguimiento = repartidor;
    this.mapa.on('load', () => {
      this.mapa.setCenter([Number(this.repartidorEnSeguimiento.coordenadas.split(',')[1]), Number(this.repartidorEnSeguimiento.coordenadas.split(',')[0])]);
      this.mapa.jumpTo({
        center: [Number(this.repartidorEnSeguimiento.coordenadas.split(',')[1]), Number(this.repartidorEnSeguimiento.coordenadas.split(',')[0])],
      });
    });
  }

  dejarSeguir() {
    this.repartidorEnSeguimiento = null;
  }

}
