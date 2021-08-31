import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { OrdenesComponent } from './ordenes.component';

describe('OrdenesComponent', () => {
  let component: OrdenesComponent;
  let fixture: ComponentFixture<OrdenesComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ OrdenesComponent ],
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
    fixture = TestBed.createComponent(OrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/

  test('verificar que se obtengan las ordenes de firebase', () => {

    //const getOrdenes = spyOn(component.getOrdenes(), "");
    expect(component.cargando).toBeTruthy();
    expect(component.ordenes.length).toEqual(0);
    //expect().toHaveBeenCalled(getOrdenes);
    //console.log(component.ordenes);
    //expect(component.ordenes.length).toBeGreaterThan(0);
    /*component.ordenController.Ordenes().subscribe(
      (response) => expect(response).not.toBeNull(),
      (error) => fail(error)
    );*/
  });
});
