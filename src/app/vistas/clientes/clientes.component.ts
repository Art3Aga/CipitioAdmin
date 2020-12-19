import { Clientes } from './../../modelos/clientes';
import { UsuarioController } from './../../controladores/usuario-controller.service';
import { Router } from '@angular/router';
import { Recursos } from './../../servicios/recursos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  displayedColumns: string[] = ['id_cliente', 'nombre', 'telefono', 'email', 'accion'];
  dataSource: MatTableDataSource<Clientes>;

  clientes: Clientes[] = [];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  constructor(private intl: MatPaginatorIntl, public recursos: Recursos,
    public usuariosController: UsuarioController, private route: Router) {

  }

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    this.usuariosController.cargando = true;
    this.usuariosController.Clientes().subscribe(
      clientes => {
        this.usuariosController.cargando = false;
        this.clientes = clientes;
        this.dataSource = new MatTableDataSource(this.clientes);
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
