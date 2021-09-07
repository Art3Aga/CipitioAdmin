import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';

import { VistaMenusComponent } from './vista-menus.component';

describe('VistaMenusComponent', () => {
  let component: VistaMenusComponent;
  let fixture: ComponentFixture<VistaMenusComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ VistaMenusComponent ],
      imports: [ 
        MatMenuModule, MatTableModule, MatSnackBarModule, MatBottomSheetModule, MatPaginatorModule,
        MatDialogModule, RouterTestingModule, AngularFireModule.initializeApp({
          apiKey: "AIzaSyDs4BS8Zg86Uc2w6VBmTlH8Y_KGQ1x4lA8",
          authDomain: "deliveryproject-3d999.firebaseapp.com",
          databaseURL: "https://deliveryproject-3d999.firebaseio.com",
          projectId: "deliveryproject-3d999",
          storageBucket: "deliveryproject-3d999.appspot.com",
          messagingSenderId: "449498209696",
          appId: "1:449498209696:web:a997f1e75ce4703e1a98c5"
        })
      ],
      schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ],
      
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
