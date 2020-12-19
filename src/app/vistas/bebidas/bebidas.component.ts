import { MenuController } from './../../controladores/menu-controller.service';
import { Router } from '@angular/router';
import { Recursos } from './../../servicios/recursos.service';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { Menu } from './../../modelos/menus';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-bebidas',
  templateUrl: './bebidas.component.html',
  styleUrls: ['./bebidas.component.scss']
})
export class BebidasComponent implements OnInit {

  displayedColumns: string[] = ['id_menu', 'nombre', 'descripcion', 'precio', 'accion'];
  dataSourceMenus: MatTableDataSource<Menu>;
  dataSourceBebidas: MatTableDataSource<Menu>;
  bebidas: Menu[] = [];
  cargando: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sortMenus: MatSort;

  constructor(private intl: MatPaginatorIntl, public recursos: Recursos,
    public menuController: MenuController, private route: Router) {
  }

  ngOnInit(): void {
    this.cargarBebidas();
  }

  cargarBebidas() {
    this.cargando = true;
    this.menuController.Menus().subscribe(
      menus => {

        this.bebidas = menus.filter(menu => menu.tipo == 'Bebida');

        this.dataSourceMenus = new MatTableDataSource(this.bebidas);
        this.dataSourceMenus.paginator = this.paginator;
        this.dataSourceMenus.sort = this.sortMenus;
        this.cargando = false;
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

  applyFilterMenus(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceMenus.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceMenus.paginator) {
      this.dataSourceMenus.paginator.firstPage();
    }
  }

}
