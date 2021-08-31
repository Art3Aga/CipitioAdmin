import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
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
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/

  test('validar formulario', () => {


    let debugElement = fixture.debugElement;
    let h1 = debugElement.query(By.css('.titulo h1')).nativeElement as HTMLElement;

    //let inputNombre = debugElement.query(By.css('mat-form-field input')).nativeElement as HTMLElement;
    //let inputClave = debugElement.query(By.css('mat-form-field input')).nativeElement as HTMLElement;

    component.nombre.setValue('Juan');
    component.clave.setValue('123');

    expect(component.nombre.valid).toBeTruthy();
    expect(component.clave.valid).toBeTruthy();
    component.login();
    expect(component.nombre.valid).toBeFalsy();
    expect(component.clave.valid).toBeFalsy();
    //component.usuarioController.IniciarSesion({})

    //expect(h1?.textContent).toContain('El Cipitio Admin');



  });

});
