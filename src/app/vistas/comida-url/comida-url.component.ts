import { Menu } from './../../modelos/menus';
import { MenuController } from './../../controladores/menu-controller.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comida-url',
  templateUrl: './comida-url.component.html',
  styleUrls: ['./comida-url.component.scss']
})
export class ComidaUrlComponent implements OnInit {

  idMenu: any;
  menu: Menu;
  styleImage: any;
  cargando: boolean = false;
  constructor(private activatedRoute: ActivatedRoute, private menuController: MenuController) { }

  ngOnInit(): void {
    this.idMenu = this.activatedRoute.snapshot.paramMap.get('id_menu');
    this.getMenus();
  }

  getMenus() {
    this.cargando = true;
    this.menuController.Menus().subscribe(
      menus => {
        this.cargando = false;
        this.menu = menus.find(menu => menu.id_menu == this.idMenu);
        if(this.menu.imagen) {
          this.ImageStyle(this.menu?.imagen);
        }
        else {
          this.ImageStyle('');
        }
      },
      error => console.log(error)
    );
  }

  ImageStyle(url_image: string): any {
    const styles = {
      'background-image': `url(${url_image})`,
      'background-position': 'center',
      'background-repeat': 'no-repeat',
      'background-size': '100% 95%',
      'border-radius': '5%'
    };
    this.styleImage = styles;
  }

}
