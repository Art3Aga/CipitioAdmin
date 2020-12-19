import { Clientes } from './../modelos/clientes';
import { UsuariosEmpresa } from './../modelos/usuarios_empresa';
import { Observable } from 'rxjs';
import { Orden } from './../modelos/orden';
import { Recursos } from './../servicios/recursos.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrdenController {

  public showOrdenDetalle: boolean = false;
  public ordenSeleccionada: Orden;
  public showSeguimientoOrden: boolean = false;
  public cargando: boolean = false;

  constructor(private recursos: Recursos, private _firestore: AngularFirestore) { }


  public Ordenes(): Observable<Orden[]> {
    return this._firestore.collection('Ordenes').valueChanges();
  }

  async AsignarRepartidorOrden(repartidor: UsuariosEmpresa, orden: Orden): Promise<UsuariosEmpresa> {
    await this._firestore.collection('OrdenesRepartidor').doc(`${orden.id_orden}-${repartidor.id_usuario}`).set({ repartidor, orden });
    await this._firestore.collection('Ordenes').doc(`${orden.id_orden}`).update(orden);
    return repartidor;

  }

  public GetOrdenByID(id_orden: number): Observable<Orden[]> {
    return this._firestore.collection('Ordenes', docs => docs.where('id_orden', '==', id_orden)).valueChanges();
  }

  public OrdenesByRepartidor(repartidor: UsuariosEmpresa): Observable<Orden[]> {
    return this._firestore.collection('OrdenesRepartidor', docs => docs.where('repartidor.id_usuario', '==', repartidor.id_usuario)).valueChanges();
  }

  public OrdenesEnCaminoRepartidor(): Observable<unknown[]> {
    return this._firestore.collection('OrdenesRepartidor', docs => docs.where('orden.estado', '==', 'En Camino')).valueChanges();
  }


}
