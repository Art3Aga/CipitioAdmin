import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { BebidasMenusComponent } from './bebidas-menus.component';

describe('BebidasMenusComponent', () => {
  let component: BebidasMenusComponent;
  let fixture: ComponentFixture<BebidasMenusComponent>;

  beforeEach( async () => {
    TestBed.configureTestingModule({
      declarations: [ BebidasMenusComponent ],
      imports: [ MatSnackBarModule, MatBottomSheetModule, MatDialogModule, RouterTestingModule,
        AngularFireModule.initializeApp({
          apiKey: "AIzaSyDs4BS8Zg86Uc2w6VBmTlH8Y_KGQ1x4lA8",
          authDomain: "deliveryproject-3d999.firebaseapp.com",
          databaseURL: "https://deliveryproject-3d999.firebaseio.com",
          projectId: "deliveryproject-3d999",
          storageBucket: "deliveryproject-3d999.appspot.com",
          messagingSenderId: "449498209696",
          appId: "1:449498209696:web:a997f1e75ce4703e1a98c5"
        })
      ],
      providers: [ 
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BebidasMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Validar Existe Menu Seleccionado', () => {
    expect(component.menuSeleccionado).not.toBeNull();
    
  });

  it('Validar Formulario de "Agregar Menu o Bebida" ', () => {
    expect(component.nombre.invalid).toBeTruthy();
    expect(component.descripcion.invalid).toBeTruthy();
    expect(component.precio.invalid).toBeTruthy();
    expect(component.tipo.invalid).toBeTruthy();





  });
});
