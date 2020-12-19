import { Router } from '@angular/router';
import { Recursos } from './../../servicios/recursos.service';
import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  title: string = 'El Cipitio Administrador';
  isLoggedIn: boolean = false;

  constructor(private recursos: Recursos, private route: Router) { }

  ngOnInit(): void {
    this.verificarLogged();
  }

  getTitulo(title: string, sidenav: MatSidenav) {
    this.title = title;
  }

  verificarLogged() {
    if(localStorage.getItem('user')) {
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }
  }


  salir() {
    this.recursos.msmmConfirmar('¿Seguro que desea salir?', 'Salir', 'Adios!', () =>  {
      localStorage.removeItem('user');
      this.route.navigateByUrl('/login');
    });
  }

}
