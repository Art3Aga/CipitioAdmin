import { Recursos } from './../../servicios/recursos.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-opciones-usuarios',
  templateUrl: './opciones-usuarios.component.html',
  styleUrls: ['./opciones-usuarios.component.scss']
})
export class OpcionesUsuariosComponent implements OnInit {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public usuario: any, private recursos: Recursos,
  private _bottomSheetRef: MatBottomSheetRef<OpcionesUsuariosComponent>) { }

  ngOnInit(): void {
  }

  verUsuario() {
    //this.recursos.verUsuario(this.usuario);
    //this.recursos.navegar(`/usuario/${this.usuario}`);
    this._bottomSheetRef.dismiss();
  }

}
