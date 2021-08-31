import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BebidasMenusComponent } from './bebidas-menus.component';

describe('BebidasMenusComponent', () => {
  let component: BebidasMenusComponent;
  let fixture: ComponentFixture<BebidasMenusComponent>;

  beforeEach( async () => {
    TestBed.configureTestingModule({
      declarations: [ BebidasMenusComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BebidasMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
