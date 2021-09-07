import { Recursos } from './../../servicios/recursos.service';
import { Router } from '@angular/router';
import { MenuController } from './../../controladores/menu-controller.service';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Menu } from './../../modelos/menus';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vista-menus',
  templateUrl: './vista-menus.component.html',
  styleUrls: ['./vista-menus.component.scss']
})
export class VistaMenusComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['id_menu', 'nombre', 'descripcion', 'precio', 'accion'];
  dataSourceMenus: MatTableDataSource<Menu>;
  dataSourceBebidas: MatTableDataSource<Menu>;
  menus: Menu[] = [];
  subscriptionMenu$: Subscription;
  cargando: boolean = false;
  errorMenus: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sortMenus: MatSort;

  constructor(private intl: MatPaginatorIntl, public recursos: Recursos,
    public menuController: MenuController, private route: Router) {
  }

  ngOnInit(): void {
    this.getMenus();
  }

  ngOnDestroy(): void {
    this.subscriptionMenu$.unsubscribe();
  }

  getMenus() {
    this.cargando = true;
    this.subscriptionMenu$ = this.menuController.Menus().subscribe(
      menus => {

        this.menus = menus.filter(menu => menu.tipo == 'Menu');

        this.dataSourceMenus = new MatTableDataSource(this.menus);
        this.dataSourceMenus.paginator = this.paginator;
        this.dataSourceMenus.sort = this.sortMenus;
        this.cargando = false;
      },
      error => this.errorMenus = error
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

  /*applyFilterBebidas(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceBebidas.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceBebidas.paginator) {
      this.dataSourceBebidas.paginator.firstPage();
    }
  }*/

}
