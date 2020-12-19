import { Clientes } from './../modelos/clientes';
import { DireccionesCliente } from './../modelos/direcciones';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UsuariosEmpresa } from './../modelos/usuarios_empresa';
import { Recursos } from './../servicios/recursos.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuarioController {

  cargando: boolean = false;
  public showMapaRastreoRepartidores: boolean = false;


  constructor(private recursos: Recursos, private _firestore: AngularFirestore, private router: Router) { }


  public IniciarSesion(usuario: UsuariosEmpresa) {

    this.cargando = true;

    this._firestore.collection('UsuariosEmpresa', ref => ref.where('nombre', '==', usuario.nombre).where('clave', '==', usuario.clave)).get()
    .subscribe(
      snapshot => {
        this.cargando = false;
        if(snapshot.empty) {
        this.recursos.msmError('Error', 'Usuario o Clave Incorrectos');
        }
        else {
          let usuario: UsuariosEmpresa = snapshot.docs[0].data();
          if(usuario.rol == 'Administrador') {
            this.recursos.msmSuccess(`Bienvenido ${usuario.nombre}`, 2000);
            localStorage.setItem('user', JSON.stringify(usuario));
            this.router.navigateByUrl('/home');
          }
          else this.recursos.msmError('Error', `Esta cuenta no es de Administrador!`);
        }
      }
    );

  }


  public Repartidores(): Observable<UsuariosEmpresa[]> {
    return this._firestore.collection('UsuariosEmpresa', docs => docs.where('rol', '==', 'Repartidor')).valueChanges();
  }

  public Clientes(): Observable<Clientes[]> {
    return this._firestore.collection('Clientes').valueChanges();
  }

  public GetClienteByID(id_cliente: string): Observable<Clientes[]> {
    return this._firestore.collection('Clientes', docs => docs.where('id_cliente', '==', id_cliente)).valueChanges();
  }

  async RegistrarRepartidor(repartidor: UsuariosEmpresa) {
    await this._firestore.collection('UsuariosEmpresa').doc(`${repartidor.id_usuario}`).set(repartidor);
    return repartidor;
  }

  public RegistrarDireccionCliente(direccion: DireccionesCliente) {
    this._firestore.collection('DireccionesCliente').doc(`${direccion.id_cliente}`).set(direccion);
  }

  public DireccionesByCliente(id_cliente: string): Observable<DireccionesCliente[]> {
    return this._firestore.collection('DireccionesCliente', docs => docs.where('id_cliente', '==', id_cliente)).valueChanges();
  }

  public RepartidorByOrden(id_orden: number): Observable<unknown[]> {
    return this._firestore.collection('OrdenesRepartidor', docs => docs.where('orden.id_orden', '==', id_orden)).valueChanges();
  }

  public BorrarUsuario(usuario: UsuariosEmpresa) {
    this.recursos.msmmConfirmarAccion(`¿Seguro Desea Eliminar a ${usuario.nombre} del Sistema?`, 'Si', () => {
      this._firestore.collection('UsuariosEmpresa').doc(`${usuario.id_usuario}`).delete().then(v => {
        this.recursos.msmSuccess('Usuario Eliminado Correctamente!', 700);
      });
    });
  }

  public UpdateUsuario(usuario: UsuariosEmpresa) {
    this._firestore.collection('UsuariosEmpresa').doc(`${usuario.id_usuario}`).update(usuario).then(v => {
      this.recursos.msmSuccess('Usuario Actualizado Correctamente!', 700);
    });
  }



}
