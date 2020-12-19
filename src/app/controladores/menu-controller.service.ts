import { Menu } from './../modelos/menus';
import { Observable } from 'rxjs';
import { Recursos } from './../servicios/recursos.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class MenuController {

  public showMenus: boolean = false;
  public showPromos: boolean = false;
  public cargando: boolean = false;

  constructor(private _firestore: AngularFirestore, private recursos: Recursos,
    private storage: AngularFireStorage) { }

  public Menus(): Observable<Menu[]> {
    return this._firestore.collection('Menus').valueChanges();
  }

  async RegistrarMenuBebida(menu: Menu): Promise<Menu> {
    await this._firestore.collection('Menus').doc(`${menu.id_menu}`).set(menu);
    return menu;
  }

  async UpdateMenuBebida(menu: Menu): Promise<Menu> {
    await this._firestore.collection('Menus').doc(`${menu.id_menu}`).update(menu);
    return menu;
  }

  public BorrarMenu(menu: Menu) {
    this.recursos.msmmConfirmarAccion('¿Seguro desea borrar este menu?', 'Si', () => {
      this._firestore.collection('Menus').doc(`${menu.id_menu}`).delete().then(value => {
        this.recursos.msmSuccess('Menu Borrado Correctamente!', 2000);
      });
    });

  }

  public subirArchivo(nombreArchivo: string, datos: any): AngularFireUploadTask {
    return this.storage.upload(nombreArchivo, datos);
  }

  public referenciaArchivo(nombreArchivo: string): AngularFireStorageReference {
    return this.storage.ref(nombreArchivo);
  }

  public referenciaArchivoURL(url: string): AngularFireStorageReference {
    return this.storage.refFromURL(url);
  }


}
