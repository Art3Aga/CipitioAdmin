import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Menu } from './../../modelos/menus';
import { Recursos } from './../../servicios/recursos.service';
import { MenuController } from './../../controladores/menu-controller.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-bebidas-menus',
  templateUrl: './bebidas-menus.component.html',
  styleUrls: ['./bebidas-menus.component.scss']
})
export class BebidasMenusComponent implements OnInit {

  hoverImgMenu: boolean = false;
  img: File;
  urlImg: string = '';
  styleImage: any;
  porcentaje = 0;
  cargando: boolean = false;

  nombre = new FormControl('', [Validators.required]);
  descripcion = new FormControl('', [Validators.required]);
  precio = new FormControl('', [Validators.required]);
  tipo = new FormControl('', [Validators.required]);

  constructor(private recursos: Recursos, public menuController: MenuController,
    public dialogRef: MatDialogRef<BebidasMenusComponent>, @Inject(MAT_DIALOG_DATA) public menuSeleccionado: Menu) { }

  ngOnInit() {
    this.validarExisteMenuSeleccionado();

  }

  validarExisteMenuSeleccionado() {
    if(this.menuSeleccionado) {
      this.nombre.setValue(this.menuSeleccionado.nombre);
      this.descripcion.setValue(this.menuSeleccionado.descripcion);
      this.precio.setValue(this.menuSeleccionado?.precio);
      this.tipo.setValue(this.menuSeleccionado.tipo);
      if(this.menuSeleccionado?.imagen) {
        this.styleImage = this.ImageStyle(this.menuSeleccionado?.imagen);
      }
      else {
        this.styleImage = this.ImageStyle('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR3KrNusXKrfwsFw2FlxfDeAtlrypODOe64Vw&usqp=CAU');
      }
    }
  }

  hoverEnter() {
    this.hoverImgMenu = true;
  }
  hoverLeave() {
    this.hoverImgMenu = false;
  }

  atras() {
    //this.route.navigateByUrl('/menus_promos');
    this.dialogRef.close();
  }


  addMenu() {

    if(this.nombre.valid && this.descripcion.valid && this.precio.valid && this.tipo.valid && this.img) {

      this.cargando = true;

      this.menuController.subirArchivo(this.img.name, this.img).snapshotChanges().subscribe(snapshot => {
        this.porcentaje = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if(this.porcentaje == 100) {
          snapshot.ref.getDownloadURL().then(
            url => {
              let menu: Menu = {
                id_menu: new Date().valueOf(),
                nombre: this.nombre.value,
                descripcion: this.descripcion.value,
                precio: this.precio.value,
                imagen: url,
                tipo: this.tipo.value,
                cantidad: 0,
                nota: '',
                subtotal: 0,
                veces_pedidas: 0
              };
              this.menuController.RegistrarMenuBebida(menu).then(menuResponse => {
                this.cargando = false;
                this.recursos.msmSuccess(`${menuResponse.nombre} Registrado Correctamente!`, 2000);
                this.atras();
              });
            }
          );
        }
      });

    }
    else {
      this.recursos.msmError('Error', 'Faltan Datos!');
    }

  }


  updateMenu() {
    if(this.img) { // Se va a actualizar la imagen y todo
      if(this.nombre.valid && this.descripcion.valid && this.precio.valid && this.tipo.valid) {

        this.cargando = true;

        this.menuSeleccionado.nombre = this.nombre.value;
        this.menuSeleccionado.descripcion = this.descripcion.value;
        this.menuSeleccionado.precio = this.precio.value;
        this.menuSeleccionado.tipo = this.tipo.value;


        this.menuController.referenciaArchivoURL(this.menuSeleccionado?.imagen).put(this.img).then(snapshot => {
          snapshot.ref.getDownloadURL().then(url => {
            this.menuSeleccionado.imagen = url;
            this.menuController.RegistrarMenuBebida(this.menuSeleccionado).then(menuResponse => {
              this.cargando = false;
              this.recursos.msmSuccess(`${menuResponse.nombre} Actualizado Correctamente!`, 2000);
              this.atras();
            });
          });
        });
      }
      else {
        this.recursos.msmError('Error', 'Faltan Datos!');
      }
    }
    else { // Se actualizara todo menos la imagen

      if(this.nombre.valid && this.descripcion.valid && this.precio.valid && this.tipo.valid) {

        this.menuSeleccionado.nombre = this.nombre.value;
        this.menuSeleccionado.descripcion = this.descripcion.value;
        this.menuSeleccionado.precio = this.precio.value;
        this.menuSeleccionado.tipo = this.tipo.value;

        this.menuController.RegistrarMenuBebida(this.menuSeleccionado).then(menuResponse => {
          this.recursos.msmSuccess(`${menuResponse.nombre} Actualizado Correctamente!`, 2000);
          this.atras();
        });

      }
      else {
        this.recursos.msmError('Error', 'Faltan Datos!');
      }
    }
  }

  SeleccionarFile(event) {
    let file: any = event.target.files[0];
    let divimg: any = document.getElementsByClassName('img-menu')[0];

    this.img = file;
    let reader = new FileReader();
    reader.onloadend = () =>  {
      divimg.style.backgroundImage = `url(${reader.result.toString()})`;
      divimg.style.backgroundPosition = 'center';
      divimg.style.backgroundRepeat = 'no-repeat';
    }
    if(file) {
      reader.readAsDataURL(file);
    }

  }

  ImageStyle(url_image: string): any {
    const styles = {
      //'color': '#ffffff',
      //'background-image': `linear-gradient(rgba(36, 38, 53, 0.513), rgba(36, 38, 53, 0.513)), url(${url_image})`,
      'background-image': `url(${url_image})`,
      'background-position': 'center',
      'background-repeat': 'no-repeat',
      'background-size': '100% 95%',
      'border-radius': '5%'
    };
    return styles;
  }

}
