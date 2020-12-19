import { UsuariosEmpresa } from './../../modelos/usuarios_empresa';
import { UsuarioController } from './../../controladores/usuario-controller.service';
import { Router } from '@angular/router';
import { Recursos } from './../../servicios/recursos.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-repartidor',
  templateUrl: './add-repartidor.component.html',
  styleUrls: ['./add-repartidor.component.scss']
})
export class AddRepartidorComponent implements OnInit {

  hide: boolean = true;
  color: string = '';

  nombre = new FormControl('', [Validators.required]);
  telefono = new FormControl('', [Validators.required]);
  clave = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<AddRepartidorComponent>, private recursos: Recursos,
    public usuarioController: UsuarioController, private route: Router) {

  }

  ngOnInit(): void {
    this.getRandomColor();
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    this.color = color;
  }

  atras() {
    //this.route.navigateByUrl('/repartidores');
    this.dialogRef.close();
  }

  GuardarRepartidor() {

    let repartidor: UsuariosEmpresa = {
      id_usuario: new Date().valueOf().toString(),
      nombre: this.nombre.value,
      telefono: this.telefono.value,
      clave: this.clave.value,
      color: this.color,
      rol: 'Repartidor',
      coordenadas: '13.470968795509167,-88.17096193206221'
    }

    this.usuarioController.cargando = true;

    this.usuarioController.RegistrarRepartidor(repartidor).then(
      response => {
        this.dialogRef.close();
        this.usuarioController.cargando = false;
        this.recursos.msmSuccess(`Repartidor Registrado Correctamente`, 2000);
      },
      error => console.log(error)
    );
  }

}
