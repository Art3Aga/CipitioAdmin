import { Component, OnInit } from '@angular/core';
import { UsuariosEmpresa } from '../../modelos/usuarios_empresa';
import { UsuarioController } from '../../controladores/usuario-controller.service';
import { Router } from '@angular/router';
import { Recursos } from '../../servicios/recursos.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;
  nombre = new FormControl('', [Validators.required]);
  clave = new FormControl('', [Validators.required]);

  constructor(private recursos: Recursos, public usuarioController: UsuarioController, private route: Router) { }

  ngOnInit(): void {

    /*if(this.IsLogueado()) {
      this.route.navigateByUrl('/home');
    }*/

  }

  
  login() {
    if(this.nombre.valid && this.clave.valid) {
      let usuario: UsuariosEmpresa = {
        nombre: this.nombre.value,
        clave: this.clave.value
      };
      this.usuarioController.IniciarSesion(usuario);
      usuario = null;
      this.limpiarInputs();
    }
    else {
      this.recursos.msmError('Error', 'Faltan Datos...');
    }
  }


  limpiarInputs() {
    this.nombre.setValue('');
    this.clave.setValue('');
  }


  IsLogueado(): boolean {
    return localStorage.getItem('user') ? true : false
  }

}
