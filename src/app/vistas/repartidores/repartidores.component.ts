import { UsuarioController } from './../../controladores/usuario-controller.service';
import { Router } from '@angular/router';
import { Recursos } from './../../servicios/recursos.service';
import { UsuariosEmpresa } from './../../modelos/usuarios_empresa';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-repartidores',
  templateUrl: './repartidores.component.html',
  styleUrls: ['./repartidores.component.scss']
})
export class RepartidoresComponent implements OnInit {

  displayedColumns: string[] = ['id_usuario', 'nombre', 'color', 'estado', 'accion'];
  dataSource: MatTableDataSource<UsuariosEmpresa>;

  repartidores: UsuariosEmpresa[] = [];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  constructor(private intl: MatPaginatorIntl, public recursos: Recursos,
    public usuariosController: UsuarioController, private route: Router) {

  }

  ngOnInit() {
    this.cargarRepartidores();
  }

  cargarRepartidores() {
    this.usuariosController.cargando = true;
    this.usuariosController.Repartidores().subscribe(
      repartidores => {
        this.usuariosController.cargando = false;
        this.repartidores = repartidores;
        this.dataSource = new MatTableDataSource(this.repartidores);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => console.log(error)
    );
  }

  ngAfterViewInit() {
    this.intl.itemsPerPageLabel = '';
    this.intl.nextPageLabel = 'Siguiente Pagina';
    this.intl.previousPageLabel = 'Pagina Anterior';
    this.intl.firstPageLabel = 'Ir a la Primera Pagina';
    this.intl.lastPageLabel = 'Ir a la Ultima Pagina';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
